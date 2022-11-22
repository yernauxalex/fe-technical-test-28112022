import React from "react";
import { Container, Table } from "react-bootstrap";

//define the type of the props
type Data = {
    horizon: number;
    horizon_date: string;
    horizon_name: string;
    trend: number;
};
type Props = {
    data: Data[];
};

const Result = ({ data }: Props) => {
    return (
        <Container className="mt-5">
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Horizon Date</th>
                        <th>Horizon Name</th>
                        <th>Trend</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.horizon}>
                            <td>{item.horizon_date}</td>
                            <td>{item.horizon_name}</td>
                            <td>{item.trend}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Result;
