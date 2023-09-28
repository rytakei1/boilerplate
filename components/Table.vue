<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto lg:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full lg:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead class="bg-white border-b">
              <tr>
                <th
                  v-for="column in columns"
                  scope="col"
                  class="text-sm font-medium text-primary px-6 py-4 text-left cursor-pointer"
                  :style="{ maxWidth: `${90 / columns.length}%` }"
                  @click="handleColumnClick(column.name)"
                >
                  <div class="flex items-center">
                    {{ column.label }}
                    <div
                      class="flex items-center ml-1"
                      :class="{ 'opacity-0': column.name !== orderColumn }"
                    >
                      <ArrowUp v-if="ascendingOrder" />
                      <ArrowDown v-else />
                    </div>
                  </div>
                </th>
                <th
                  v-if="tools?.length > 0"
                  scope="col"
                  class="text-sm font-medium text-primary py-4 text-left max-w-10%"
                >
                  <div class="flex w-fit justify-end relative">
                    <input
                      v-model="search"
                      class="border-1 pr-2 pl-8 py-2"
                      placeholder="Busca"
                    />
                    <IconSearch
                      class="absolute left-2 top-1/2 transform -translate-y-1/2"
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="entry in orderedData"
                class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td
                  v-for="column in columns"
                  class="text-sm text-primary font-light px-6 py-4"
                  :style="{ maxWidth: `${90 / columns.length}%` }"
                >
                  <div class="flex w-full items-center">
                    {{
                      column.type === "string"
                        ? column.format
                          ? column.format(entry[column.name])
                          : entry[column.name] || column?.defaultValue
                        : null
                    }}
                  </div>
                </td>
                <td
                  v-if="tools?.length > 0"
                  class="text-sm text-primary font-light px-6 py-4"
                >
                  <div class="flex justify-center">
                    <ClientOnly>
                      <Tooltip
                        v-for="tool in tools.filter(
                          (tool) => tool.type !== 'button'
                        )"
                        :title="tool.tooltip"
                      >
                        <component
                          :is="{ ...tool.icon }"
                          v-if="tool.type !== 'button'"
                          :class="{
                            'cursor-pointer':
                              !tool.disabled || !tool.disabled(entry),
                            'cursor-not-allowed':
                              tool.disabled && tool.disabled(entry),
                          }"
                          class="mx-1"
                          @click="
                            tool.disabled
                              ? tool.disabled(entry)
                                ? null
                                : handleToolClick(tool.action, entry)
                              : handleToolClick(tool.action, entry)
                          "
                        />
                      </Tooltip>
                    </ClientOnly>
                    <Button
                      v-for="tool in tools.filter(
                        (tool) => tool.type === 'button'
                      )"
                      :disabled="tool.disabled ? tool.disabled(entry) : false"
                      class="w-full"
                      @click="handleToolClick(tool.action, entry)"
                      >{{ tool.label ? tool.label(entry) : "" }}</Button
                    >
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Button :loading="exporting" class="ml-auto" @click="handleExport">
      Export Table
    </Button>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue"
import { Tooltip } from "@programic/vue3-tooltip"
import ArrowUp from "~icons/mdi/arrow-up"
import ArrowDown from "~icons/mdi/arrow-down"
import IconSearch from "~icons/material-symbols/search"
import axios from "axios"
import { FunctionalComponent } from "nuxt/dist/app/compat/capi"
interface ITableColumn {
  name: string
  label: string
  type: string
  format?: (val: string) => string
  exportFormat?: (val: string) => string
  defaultValue?: string
}
interface ITableDataEntry {
  [columnName: string]: any
}
interface ITableTool {
  action: string
  icon?: FunctionalComponent
  tooltip?: string
  type?: string
  label?: (val: ITableDataEntry) => string
  disabled?: (val: ITableDataEntry) => boolean
}
const props = defineProps({
  columns: {
    type: Array as PropType<ITableColumn[]>,
    default: () => [],
  },
  data: {
    type: Array as PropType<ITableDataEntry[]>,
    default: () => [],
  },
  tools: {
    type: Array as PropType<ITableTool[]>,
    default: () => [],
  },
})
const orderColumn = ref("")
const ascendingOrder = ref(true)
onMounted(() => {
  orderColumn.value = props.columns[0].name
  ascendingOrder.value = true
})
const emits = defineEmits(["tool-click"])
const handleToolClick = (action: string, entry: ITableDataEntry) => {
  emits("tool-click", { action, entry })
}
const handleColumnClick = (columnName: string) => {
  if (orderColumn.value === columnName) {
    ascendingOrder.value = !ascendingOrder.value
  } else {
    orderColumn.value = columnName
    ascendingOrder.value = true
  }
}
const orderedData = computed(() => {
  const sortedData = [...props.data].sort(
    (entry1: ITableDataEntry, entry2: ITableDataEntry) => {
      const entry1Value =
        typeof entry1[orderColumn.value] === "string"
          ? entry1[orderColumn.value].toLowerCase()
          : entry1[orderColumn.value]
      const entry2Value =
        typeof entry2[orderColumn.value] === "string"
          ? entry2[orderColumn.value].toLowerCase()
          : entry2[orderColumn.value]
      if (entry1Value > entry2Value) return 1
      if (entry1Value < entry2Value) return -1
      return 0
    }
  )
  const filteredData = ascendingOrder.value ? sortedData : sortedData.reverse()
  if (!search.value) return filteredData
  const columnsToConsider = props.columns.map((column) => column.name)
  return filteredData.filter((entry) => {
    for (const [key, val] of Object.entries(entry)) {
      if (columnsToConsider.includes(key)) {
        const column = props.columns.find((column) => column.name === key)
        if (column?.format) {
          if (
            column
              .format(val)
              .toLowerCase()
              .includes(search.value.toLowerCase())
          ) {
            return true
          }
        } else if (typeof val === "string") {
          if (val.toLowerCase().includes(search.value.toLowerCase())) {
            return true
          }
        }
      }
    }
    return false
  })
})
const search = ref("")
const exporting = ref(false)
const handleExport = async () => {
  // Header row
  const headerRow = props.columns.map((column) => column.label)
  const rows: string[][] = [headerRow]
  for (const entry of props.data) {
    const row = []
    for (const column of props.columns) {
      row.push(
        column.type === "string"
          ? column.exportFormat
            ? column.exportFormat(entry[column.name])
            : column.format
            ? column.format(entry[column.name])
            : entry[column.name]
          : null
      )
    }
    rows.push(row)
  }
  exporting.value = true
  const res = await axios.post(
    `${import.meta.env.VITE_FB_API_URL}/export_excel`,
    { rows },
    { responseType: "blob" }
  )
  const href = URL.createObjectURL(res.data)
  const link = document.createElement("a")
  link.href = href
  link.setAttribute("download", "file.xlsx")
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(href)
  exporting.value = false
}
</script>

<style>
.tooltip {
  position: absolute !important;
  left: 12px !important;
}
</style>
