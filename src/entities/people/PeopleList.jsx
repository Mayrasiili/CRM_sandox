import React from "react";
import { useImmer } from "use-immer";
import {
    Table,
    Text,
    Pagination,
    Title
} from '@mantine/core';

import Loading from "../../general/Loading.jsx"

import * as S from "../../configuration/method";
import APP_PARAMS from "../../configuration/config";

const PeopleList = props => {
    const [data, setData] = useImmer({});
    const [loading, setLoading] = React.useState(true);
    const [filters, setFilters] = useImmer({
        page: 1,
        pageSize: 15
    })

    React.useEffect(() => {fetchData()}, [filters])

    const fetchData = () => {
        setLoading(true);
        S.sendGetData(APP_PARAMS.SERVER_ENDPOINTS.PEOPLE_LIST + "?page=" + filters.page + "&page_size=" + filters.pageSize).then(response => {
            setData(response);
            setLoading(false);
        }).catch(e => {
            if(APP_PARAMS.DEBUG) console.log(e)
        })
    }

    if(loading) return(
        <div>
            <h1> People List </h1>
            <Loading/>
        </div>
    )
    else return (
        <div>
            <Title order={1} sx={theme => ({
                marginBottom: "5px",
                textDecoration: "underline",
                textDecorationThickness: "1px",
                textDecorationColor: theme.colors[theme.primaryColor][5]
            })}> PEOPLE LIST </Title>
            <Text size="sm" style={{marginBottom: "10px"}}>
                Total Results: {data.count}
            </Text>
            <Table
                highlightOnHover
                verticalSpacing="sm"
                sx={(theme) => ({
                    'table.mantine-Table-root.__mantine-ref-hover& tbody tr:hover': {
                    backgroundColor: theme.colors[theme.primaryColor][0],
                    },
                    "&": {
                        marginBottom: "25px",
                    },
                    "& thead tr": {
                        backgroundColor: theme.colors[theme.primaryColor][1]
                    }
                })}
            >
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {data.results.map(person => (
                        <tr key={person.entityId}>
                            <td>{person.firstName}</td>
                            <td>{person.lastName}</td>
                            <td>{person.contactData && (person.contactData.find(e => APP_PARAMS.CONTACT_TYPES.EMAIL_TYPES.includes(e.contactType) && e.value !== "")?.value ?? <Text size="xs" color="dimmed"> - </Text>)}</td>
                            <td>{person.contactData && (person.contactData.find(e => APP_PARAMS.CONTACT_TYPES.PHONE_TYPES.includes(e.contactType) && e.value !== "")?.value ?? <Text size="xs" color="dimmed"> - </Text>)}</td>
                            <td>{person.addressId && (S.addressStringBuilder(person.addressId) ?? <Text size="xs" color="dimmed"> - </Text>)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination
                position="center"
                page={filters.page}
                total={Math.round((data.count / filters.pageSize) + 0.5)}
                onChange={(page) => setFilters(draft => {draft.page = page})}
            />
        </div>
    )
}

export default PeopleList;
