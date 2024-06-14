export default function AdminChartTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="flex gap-2 px-2 py-1 bg-white border border-dark-gray">
        <span>{payload[0].payload.tooltipText}:</span>
        <span className='font-semibold'>{payload[0].value}</span>
      </div>
    );
  }

  return null;
};