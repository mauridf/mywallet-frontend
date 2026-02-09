type Props = {
  history: { label: string; balance: number }[];
};

export function CapitalCurve({ history }: Props) {
  return (
    <Card className="h-[320px]">
      <div className="text-sm text-gray-500 mb-2">Curva de capital</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={history}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
