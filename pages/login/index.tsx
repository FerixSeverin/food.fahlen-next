import React from "react"
import styled from "styled-components"
import { SimpleInput } from "../../components/form/inputs"
import { InputLabel } from "../../components/form/labels"

const LoginForm = styled.form`

`

const LoginIndex: React.FC = () => {
  return (
    <LoginForm>
      <InputLabel>E-mail</InputLabel>
      <SimpleInput type='email'></SimpleInput>
      <InputLabel>Password</InputLabel>
      <SimpleInput type='password'></SimpleInput>
    </LoginForm>
  )
}

export default LoginIndex