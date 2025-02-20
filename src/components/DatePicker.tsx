import { memo, useContext, useState } from 'react'

import Tippy from '@tippyjs/react'
import { Calendar, IPeriodPreset } from './calendar/Calendar'
import { ChartContext, useStore } from './store'
import { DropdownWrapper } from './ultraSelect/UltraSelect'

export type DatePickerState = {
  controlSeries?: boolean
  value?: Date[] | null
  onSelect?: (value: Date[]) => void
  options?: IPeriodPreset[]
}

// eslint-disable-next-line react/display-name
export const DatePicker = memo(() => {
  const { value, options } = useStore(
    (state) => state.charts[id].properties.dateRange || {}
  )

  const [visible, setVisible] = useState(false)

  return (
    <>
      <Tippy
        animation={false}
        interactive
        visible={visible}
        delay={[0, 0]}
        onClickOutside={() => setVisible(false)}
        placement="bottom-start"
        render={(attrs) => (
          <div {...attrs}>
            <DropdownWrapper>
              <Calendar
                range={value || []}
                mode="range"
                onRangeChange={(v) => {
                  onChange(v)
                  setVisible(false)
                }}
                onClear={() => {
                  onChange(null)
                  setVisible(false)
                }}
                periodPresets={options}
                maxDate={new Date()}
              />
            </DropdownWrapper>
          </div>
        )}
      >
        <div
          className="sd-chart__date-range"
          onClick={() => setVisible((s) => !s)}
        >
          <button
            type="button"
            className={
              value && value.length > 0
                ? 'btn btn-outline-primary dropdown-toggle'
                : 'btn btn-outline-secondary dropdown-toggle'
            }
          >
            {value && value.length > 0 ? (
              value.map(formatDate).join(' - ')
            ) : (
              <span className="sd-chart__placeholder">Date Range</span>
            )}
          </button>
        </div>
      </Tippy>
    </>
  )
})

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' }).format(date)
}
