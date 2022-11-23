import React, { useState, FormEvent } from "react";
import { getFlows, getRuns, getOutputs, getTrends } from "../utils/apiCalls";
import Result from "./Result";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

// Type definition
// Here flow_id is fixed to 1 because the api only works with this flow_id, but we could add a select input to choose the flow_id later
const flow_id: Readonly<number> = 1;

type Data = {
    horizon: number;
    horizon_date: string;
    horizon_name: string;
    trend: number;
};

const Main = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [displayError, setDisplayError] = useState<string>("");
    //state with the data from the api
    const [data, setData] = useState<Data[]>();

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Reset the data state in case the user submit a new date
        setData(undefined);
        // convert date to UTC
        const utcDate: Date = new Date(selectedDate.toUTCString());
        // convert date to iso format and remove the difference with UTC time because its converted on the input
        const isoDate: string = utcDate.toISOString().slice(0, -5) + "Z";

        await getFlows(flow_id).then((response) => {
            if (response === null) {
                return setDisplayError("Flow id not found");
            }

            getRuns(flow_id, isoDate).then((response) => {
                if (response === null) {
                    return setDisplayError("No runs found for this date");
                }
                if (response.results[0].complete === false) {
                    return setDisplayError("Run not complete for this date");
                }
                const run_id = response.results[0].id;

                getOutputs(flow_id, run_id).then((response) => {
                    if (response === null) {
                        return setDisplayError("No outputs found for this run");
                    }
                    const output_id = response.results[0].id;

                    getTrends(flow_id, run_id, output_id).then((response) => {
                        if (response === null) {
                            return setDisplayError(
                                "No trends found for this output"
                            );
                        }

                        // Create the dataset who will be used to display the table
                        const data: Data[] = [];
                        response.results.forEach((item) => {
                            data.push({
                                horizon: item.horizon,
                                horizon_date: item.horizon_date.split("T")[0],
                                horizon_name: item.horizon_name,
                                trend: item.trend,
                            });
                        });
                        // reset the error message
                        setDisplayError("");
                        setData(data);
                    });
                });
            });
        });
    };

    return (
        <Container className="mt-5">
            <Form>
                <Form.Group
                    as={Row}
                    className="mb-3 d-flex justify-content-center"
                >
                    <Form.Label column md={2}>
                        Select a date
                    </Form.Label>
                    <Col md={3} xs="auto">
                        <Form.Control
                            type="date"
                            required
                            //add default value to the input
                            defaultValue={selectedDate
                                .toISOString()
                                .slice(0, 10)}
                            value={selectedDate.toISOString().slice(0, 10)}
                            onChange={(e) =>
                                setSelectedDate(new Date(e.target.value))
                            }
                        />
                    </Col>
                    <Col md={1} xs="auto">
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={onSubmit}
                        >
                            Submit
                        </Button>
                    </Col>
                </Form.Group>
                {/* display error message */}
                {displayError && (
                    <p className="text-danger text-center">{displayError}</p>
                )}
            </Form>
            {data && <Result data={data} />}
        </Container>
    );
};

export default Main;
