import {Stack, Text} from '@sanity/ui'
import {set, type NumberInputProps} from 'sanity'

/**
 * A deliberately small custom control: the native number input remains available,
 * while dragging the range handle makes spacing overlays feel immediate in Presentation.
 */
export function RangeSliderInput(props: NumberInputProps) {
  const value = typeof props.value === 'number' ? props.value : 52

  return (
    <Stack space={3}>
      <input
        aria-label={`${props.schemaType.title || 'Value'} slider`}
        max={90}
        min={0}
        onChange={(event) => props.onChange(set(Number(event.currentTarget.value)))}
        step={1}
        style={{width: '100%', accentColor: '#2276fc'}}
        type="range"
        value={value}
      />
      <Text muted size={1}>{value}% overlay</Text>
      {props.renderDefault(props)}
    </Stack>
  )
}
