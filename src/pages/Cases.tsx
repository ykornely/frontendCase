import { useState, useEffect } from 'react'
import { getCompany, getCreditors, getCreditorSettings, getUserStatistics, getCaseStatistics, getInvoices } from '../api'
import { Link } from 'react-router-dom'

const Cases = () => {
    const [company, setCompany] = useState({})
    const [creditors, setCreditors] = useState<Object[]>([{'id': ''}])
    const [creditorSettings, setCreditorSettings] = useState({})
    const [UserStatistics, setUserStatistics] = useState({})
    const [caseStatistics, setCaseStatistics] = useState({})
    const [invoices, setInvoices] = useState<Object[]>()

    useEffect(() => {
        let fetchedCompany: Object
        let fetchedCreditors: [{'id': ''}]
        let fetchedCreditorSettings: Object
        let fetchedUserStatistics: Object
        let fetchedCaseStatistics: Object
        let fetchedInvoices: Object[]

        const asyncGetCompany = async () => {
                fetchedCompany = await getCompany()
        }

        const asyncGetCreditors = async () => {
                const { value: creditorsArray } = await getCreditors()
                fetchedCreditors = creditorsArray
        }

        const asyncGetCreditorSettings = async (creditorId: string) => {
            fetchedCreditorSettings = await getCreditorSettings(creditorId)
        }

        const asyncGetUserStatistics = async () => {
            const { value: userStatisticsObject } = await getUserStatistics()
            fetchedUserStatistics = userStatisticsObject
        }

        const asyncGetCaseStatistics = async () => {
            fetchedCaseStatistics = await getCaseStatistics()
        }

        const asyncGetInvoices = async () => {
            const { data: invoicesArray } = await getInvoices()
            fetchedInvoices = invoicesArray
    }

        async function getAndSetInformation() {
            // get information via requests of the api
            await asyncGetCompany()
            await asyncGetCreditors()
            fetchedCreditors.forEach(async creditor => {
                await asyncGetCreditorSettings(creditor.id)
            });
            await asyncGetUserStatistics()
            await asyncGetCaseStatistics()
            await asyncGetInvoices()

            // set fetched information into states
            setCompany(fetchedCompany)
            setCreditors(fetchedCreditors)
            setCreditorSettings(fetchedCreditorSettings)
            setUserStatistics(fetchedUserStatistics)
            setCaseStatistics(fetchedCaseStatistics)
            setInvoices(fetchedInvoices)
        }

        getAndSetInformation()
    }, [])

    // const showData = () => {
    //     /* TODO */
    // }


    return (
        <div>
            <div>
                <h1>Creditors</h1>
                {creditors.map((creditor: any) => {
                    return <p key={creditor.id}>{creditor.name}</p>
                })}
            </div>
            {/*<div>{company !== {} && <button onClick={() => {showData()}} >Show Data</button>}</div>*/}
            <Link to={`/login`} onClick={() => localStorage.removeItem('token')}>
                <h2>Logout</h2>
            </Link>
        </div>
    )
}


export default Cases