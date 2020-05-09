import React, { useState, useEffect, useRef } from 'react'
import { ClickAwayListener } from '@material-ui/core'
import styles from './assets/select.module.sass'


function Select(props) {
  const inputRef = useRef()
  const { onChange, name } = props
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [label, setLabel] = useState("")

  useEffect(() => {
    if (onChange && value) {
      onChange(inputRef.current)
    }

  }, [value, onChange, name])

  function handleSelect(e) {
    setLabel(e.currentTarget.dataset.label)
    setValue(e.currentTarget.dataset.value)
  }

  function handleMenu() {
    setOpen(prevLabel => !prevLabel)
  }

  function closeMenu() {
    setOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={closeMenu}>
      <div className={`${styles.selectContainer} ${props.className}`} onClick={handleMenu}>
        <div className={styles.iconContainer}>
          {props.icon}
        </div>
        <input name={props.name} value={value} type="hidden" ref={inputRef} />
        <input type="text" value={label} disabled placeholder={props.placeholder} />
        <ul className={`${styles.containerOptions} ${open ? styles.open : ''}`}>
          <li
            data-value={props.noSelectionValue}
            data-label=""
            onClick={handleSelect}
          >
            {props.placeholder}
          </li>
          {props.options.map((option, index) => {
            return (
              <li
                key={option[props.idKey] ?? index}
                data-value={option[props.valueKey]}
                data-label={option[props.labelKey]}
                onClick={handleSelect}
              >
                {option[props.labelKey]}
              </li>
            )
          })}
        </ul>
      </div>
    </ClickAwayListener>
  )
}

export default Select