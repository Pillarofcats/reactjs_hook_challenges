/*
Create a PhoneNumberInput component.

1. only accepts numerical digits
2. format the number automatically as (123)456-7890 by

-adding the parenthesis when the 4th digit is entered
-also adding - before 7th digit
*/

import React, {useState} from 'react'
export function PhoneNumberInput() {

  const [phoneNumber, setPhoneNumber] = useState<string>("")

  function onChange (e:React.ChangeEvent<HTMLInputElement>) {

    //Any non-digit value in the string is replaced with an empty space ''
    let current = e.target.value.replace(/\D/g,'')

    //Every change causes all non-digit values to be replaced with '', we then re-apply the formatting
    //The formatting is applied from end to start
    if(current.length > 10) current = current.slice(0,10)
    if(current.length > 6) current = `${current.slice(0,6)}-${current.slice(6)}`
    if(current.length > 3) current = `(${current.slice(0,3)})${current.slice(3)}`
    
    setPhoneNumber(current)
  }

  return <input data-testid="phone-number-input" value={phoneNumber} onChange={onChange}/>
}