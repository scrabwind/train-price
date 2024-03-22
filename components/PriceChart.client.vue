<script setup lang="ts">
import { use } from 'echarts/core'
import VChart from 'vue-echarts'
import { BarChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption } from 'echarts/charts'

import type {
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  ToolboxComponentOption,
  GridComponentOption,
} from 'echarts/components'

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
])

type EChartsOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | ToolboxComponentOption
  | GridComponentOption
  | BarSeriesOption
>

const theme = useColorMode()

const store = useTrainPrice()

const config = useRuntimeConfig()

const chartOptions = computed<EChartsOption>(() => ({
  title: {
    text: 'Price',
  },
  tooltip: {
    trigger: 'axis',
    valueFormatter: v => {
      const formatedNumber = ((v as number) + config.public.basePrice) / 100
      return `${formatedNumber} CZK = ${Math.round(formatedNumber * 0.17)} PLN`
    },
  },
  backgroundColor: theme.value === 'dark' ? '#121212' : '#FFF',
  grid: {
    left: '3%',
    right: '3%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'time',
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: v => `${v + config.public.basePrice}`,
    },
  },
  legend: {},
  series: [
    {
      name: 'Chromium',
      type: 'bar',
      data: store.getChartData.chromium,
      itemStyle: {
        color: '#3b82f6',
      },
    },
    {
      name: 'Firefox',
      type: 'bar',
      data: store.getChartData.firefox,
      itemStyle: {
        color: '#f97316',
      },
    },

    {
      name: 'Webkit',
      type: 'bar',
      data: store.getChartData.webkit,
      itemStyle: {
        color: '#4fcabc',
      },
    },
  ],
}))
</script>

<template>
  <div class="h-screen">
    <VChart :option="chartOptions" :theme="$colorMode.value" />
  </div>
</template>
