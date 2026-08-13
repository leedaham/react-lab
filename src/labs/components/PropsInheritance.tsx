export interface InheritGroup {
  source: string;
  props: {name: string; desc: string}[];
}

export interface ChainNode {
  name: string;
  note?: string;
}

export interface PropsInheritanceProps {
  chain: ChainNode[];
  groups: InheritGroup[];
  docsUrl: string;
  customProps?: {name: string; desc: string; default?: string}[];
}

export function PropsInheritance({chain, groups, docsUrl, customProps}: PropsInheritanceProps) {
  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
      <h3 className="mb-2 text-sm font-semibold">상속 구조</h3>
      <p className="mb-3 text-xs text-gray-600">
        이 컴포넌트는 React Aria의 props를 그대로 물려받습니다. 아래 체인을 따라가며 어떤 props가
        상속되는지 확인할 수 있습니다.
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-y-2">
        {chain.map((node, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-gray-400">→</span>}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs text-blue-700 ring-1 ring-gray-200">
              {node.name}
            </code>
            {node.note && <span className="text-[11px] text-gray-500">{node.note}</span>}
          </span>
        ))}
      </div>

      {customProps && customProps.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-1.5 text-xs font-semibold text-gray-700">직접 정의한 props</h4>
          <table className="w-full max-w-xl text-sm">
            <tbody>
              {customProps.map((p) => (
                <tr key={p.name} className="border-b border-gray-200 last:border-0">
                  <td className="py-1.5 pr-4 font-mono text-xs">{p.name}</td>
                  <td className="py-1.5 pr-4 text-xs text-gray-600">{p.desc}</td>
                  <td className="py-1.5 font-mono text-xs text-gray-500">{p.default ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h4 className="mb-1.5 text-xs font-semibold text-gray-700">상속받은 props (그룹별)</h4>
      <div className="grid gap-3 sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group.source} className="rounded-lg border border-gray-200 bg-white p-3">
            <code className="mb-1 block font-mono text-xs font-semibold text-blue-700">
              {group.source}
            </code>
            <ul className="space-y-1">
              {group.props.map((p) => (
                <li key={p.name} className="text-xs">
                  <code className="font-mono text-neutral-800">{p.name}</code>
                  <span className="ml-1.5 text-gray-500">{p.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <a
        href={docsUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-block text-xs text-blue-600 underline hover:text-blue-800">
        전체 props 보기: {docsUrl}
      </a>
    </div>
  );
}
