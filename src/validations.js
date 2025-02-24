export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  export const validatePassword = (password) => {
    const sqlInjectionPattern = /('|"|;|--|\/\*|\*\/|xp_|sp_|exec|execute|select|insert|update|delete|drop|union|into|load_file|outfile)/i;
    const complexityPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (sqlInjectionPattern.test(password)) {
        return false;
    }

    return complexityPattern.test(password);
};

  export const validateSecurityAnswer = (answer) => {
    const sqlInjectionPattern = /('|"|;|--|\/\*|\*\/|xp_|sp_|exec|execute|select|insert|update|delete|drop|union|into|load_file|outfile)/i
    
    if (sqlInjectionPattern.test(answer)) {
      return false
    }
  
    return answer.trim().length >= 1 && answer.trim().length <= 100
  }
  
  export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return ''
    
    return input
      .trim()
      .replace(/[<>]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/\0/g, '')
  }
  