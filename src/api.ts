interface ILoginCreditentals {
    username: string
    password: string
}

const authenticate = async (creditentals: ILoginCreditentals) => {
    const params = {
        grant_type: "password",
        username: creditentals.username,
        password: creditentals.password,
        audience: "https://api-staging.kraviainkasso.no",
        scope: "openid email profile read:findata create:findata",
        client_id: "EzvgVwdLG52qO3o17fV01nRjwHQo9byG",
        client_secret: "iBWY2g_e7ESDYtCm9ifz4bWZ40nIl8Lbhi3tii0X5hO1gC6zCkqP8_h8ob4VxOlp",
      };

    const response = await fetch('https://kravia.eu.auth0.com/oauth/token', {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(params).toString(),
      })

      if (!response.ok) {
        const body = await response.json()
        throw new Error(body)
    }

      return await response.json()
}

const getCompany = async () => {
    const response = await fetch('https://api-staging.kraviainkasso.no/api/v2/company', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    })

    return await response.json()
}

const getCreditors = async () => {
    const response = await fetch('https://api-staging.kraviainkasso.no/api/v2/creditor', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    })

    return await response.json()
}

const getCreditorSettings = async (creditorId: string) => {
    const response = await fetch(`https://api-staging.kraviainkasso.no/api/v2/creditor/${creditorId}/settings`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    })

    return await response.json()
}

const getUserStatistics = async () => {
    const response = await fetch(`https://api-staging.kraviainkasso.no/api/v2/statistic/cases`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    })

    return await response.json()
}

const getCaseStatistics = async () => {
    const response = await fetch(`https://api-staging.kraviainkasso.no/api/v2/statistic/creditor`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    })

    return await response.json()
}

const getInvoices = async () => {
    const response = await fetch(`https://api-staging.kraviainkasso.no/api/v2.0/invoice/search/q`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
    })

    return await response.json()
}


export { getCompany, authenticate, getCreditors, getCreditorSettings, getUserStatistics, getCaseStatistics, getInvoices }