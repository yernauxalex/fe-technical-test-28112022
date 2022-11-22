import React, { useState, FormEvent } from "react";
import { getFlows, getRuns, getOutputs, getTrends } from "../utils/apiCalls";
import Result from "./Result";

// Type definition
// Here flow_id is fixed to 1 because the api only works with this flow_id, but we could add a select input to choose the flow_id later
const flow_id: Readonly<number> = 1;

type Data = {
    horizon: number;
    horizon_date: string;
    horizon_name: string;
    trend: number;
};

const Form = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    //state with the data from the api
    const [data, setData] = useState<Data[]>();

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // convert date to iso format and remove the difference with UTC time because its converted on the input
        const isoDate = selectedDate.toISOString().slice(0, -5) + "Z";

        await getFlows(flow_id).then((response) => {
            if (response === null) {
                return alert("Flow id not found");
            }

            getRuns(flow_id, isoDate).then((response) => {
                if (response === null) {
                    return alert("no run available for this date");
                }
                if (response.results[0].complete === false) {
                    return alert("no complete run for this date");
                }
                const run_id = response.results[0].id;

                getOutputs(flow_id, run_id).then((response) => {
                    if (response === null) {
                        return alert("No outputs found");
                    }
                    const output_id = response.results[0].id;

                    getTrends(flow_id, run_id, output_id).then((response) => {
                        if (response === null) {
                            return alert("No trends found");
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
                        setData(data);
                    });
                });
            });
        });
    };

    return (
        <>
            <form>
                <input
                    type="date"
                    value={selectedDate.toUTCString()}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                />
                <button onClick={onSubmit}>Submit</button>
            </form>
            {data ? <Result data={data} /> : null}
        </>
    );
};
export default Form;
