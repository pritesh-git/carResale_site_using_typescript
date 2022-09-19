export const ValidateLogin = (data: any) => {
  let errors: { [key: string]: any } = {}
  let isValid = true

  if (!data['userName']) {
    isValid = false
    errors['userName'] = 'Please enter a username!'
  } else {
    if (!data['userName'].match(/^[a-zA-Z]+$/)) {
      isValid = false
      errors['userName'] = 'Please enter only Alphabet'
    }
  }
  if (!data['password'] || data['password'].length <= 6) {
    isValid = false
    errors['password'] = 'Please enter 6 digit long password!'
  } else {
    if (!data['password'].match(/^[a-zA-Z]+$/)) {
      isValid = false
      errors['password'] = 'Please enter only Alphabet'
    }
  }

  return { errors, isValid }
}
export const ValidateSignup = (data: any) => {
  let errors: { [key: string]: any } = {}
  let isValid = true

  if (!data['userName']) {
    isValid = false
    errors['userName'] = 'Please enter a username!'
  } else {
    if (!data['userName'].match(/^[a-zA-Z]+$/)) {
      isValid = false
      errors['userName'] = 'Please enter only Alphabet'
    }
  }
  if (!data['password'] || data['password'].length <= 6) {
    isValid = false
    errors['password'] = 'Please enter 6 digit long password!'
  } else {
    if (!data['password'].match(/^[a-zA-Z]+$/)) {
      isValid = false
      errors['password'] = 'Please enter only Alphabet'
    }
  }
  if (!data['email'] || data['email'].length <= 6) {
    isValid = false
    errors['email'] = 'Please enter valid email!'
  } else {
    const lastAtPos = data['email'].lastIndexOf('@')
    const lastDotPos = data['email'].lastIndexOf('.')
    if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        data['email'].indexOf('@@') === -1 &&
        lastDotPos > 2 &&
        data['email'].length - lastDotPos > 2
      )
    ) {
      isValid = false
      errors['email'] = 'Please enter valid email!'
    }
  }

  return { errors, isValid }
}
