export function TableItem({ id, keyTb, value }) {
    return (
        <div className="row d-flex">
            <div className="number">{id}</div>
            <div className="key">{keyTb}</div>
            <div className="value">{value}</div>
        </div>
    )
}