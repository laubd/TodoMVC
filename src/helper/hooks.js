import { useState, useMemo } from 'react'
/**
 * input props快捷使用
 */
export const useBind = (initValue = '') => {
 const [ value, setValue ] = useState(initValue)

 return useMemo(() => ({
   value,
   onChange: (e) => {
     if (e && e.target) {
      setValue(e.target.value)
     } else {
       setValue(e)
     }
   }
 }), [value, setValue])
}
