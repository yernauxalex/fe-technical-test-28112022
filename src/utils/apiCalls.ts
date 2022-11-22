type Flows = {
    flow_name: string;
    id: number;
    run_frequency: string;
    start_date: string;
    status: string;
};
type Runs = {
    count: number;
    next: string;
    previous: string;
    results: [
        {
            complete: boolean;
            flow: number;
            id: number;
            production_date: string;
        }
    ];
};
type Outputs = {
    count: number;
    next: string;
    previous: string;
    results: [
        {
            id: number;
            output_type: string;
            run: number;
        }
    ];
};
type Trends = {
    count: number;
    next: string;
    previous: string;
    results: [
        {
            horizon: number;
            horizon_date: string;
            horizon_frequency: string;
            horizon_name: string;
            id: number;
            output_type: string;
            trend: number;
        }
    ];
};

export async function getFlows(flow_id: number): Promise<Flows> {
    return fetch(`https://test-backend.i.datapred.com/flows/${flow_id}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status.toString());
            }
            return response.json();
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
}

export async function getRuns(flow_id: number, date: string): Promise<Runs> {
    return fetch(
        `https://test-backend.i.datapred.com/flows/${flow_id}/runs?production_date=${date}`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status.toString());
            }
            return response.json();
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
}

export async function getOutputs(
    flow_id: number,
    run_id: number
): Promise<Outputs> {
    return fetch(
        `https://test-backend.i.datapred.com/flows/${flow_id}/runs/${run_id}/outputs`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status.toString());
            }
            return response.json();
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
}

export async function getTrends(
    flow_id: number,
    run_id: number,
    output_id: number
): Promise<Trends> {
    return fetch(
        `https://test-backend.i.datapred.com/flows/${flow_id}/runs/${run_id}/outputs/${output_id}/trends`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status.toString());
            }
            return response.json();
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
}
