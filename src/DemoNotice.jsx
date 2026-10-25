export default function DemoNotice() {
    return (
        <p role="status" style={{
            margin: '8px 0',
            padding: '8px 12px',
            background: '#fff4ce',
            border: '1px solid #e0c060',
            borderRadius: 4,
            color: '#333',
        }}>
            Demo data: the course API is offline, so changes are not saved.
        </p>
    );
}
