import {Folder, FileText} from 'lucide-react';
import {useEffect, useState} from 'react';
import {TreeLogpresso, TreeItemLogpresso} from './components/TreeLogpresso';
import {ThemeToggle} from './components/ThemeToggle';
import {PropsInheritance} from './components/PropsInheritance';
import {useLogpressoTheme} from './components/utils';

const usageCode = `import { TreeLogpresso, TreeItemLogpresso } from './components/TreeLogpresso';
import { Folder } from 'lucide-react';

// 테마는 <html data-theme="dark"> 값을 자동으로 감지합니다.
// theme prop을 전달할 필요가 없습니다.
<TreeLogpresso
  aria-label="로그 소스"
  selectionMode="multiple"
  defaultExpandedKeys={['security', 'system']}
>
  <TreeItemLogpresso id="security" label="보안 로그" icon={<Folder />}>
    <TreeItemLogpresso id="security-auth" label="인증 이벤트" icon={<Folder />}>
      <TreeItemLogpresso label="로그인 성공" icon={<FileText />} />
      <TreeItemLogpresso label="로그인 실패" icon={<FileText />} />
    </TreeItemLogpresso>
    <TreeItemLogpresso id="security-fw" label="방화벽" icon={<Folder />}>
      <TreeItemLogpresso label="차단 이벤트" icon={<FileText />} />
    </TreeItemLogpresso>
  </TreeItemLogpresso>
  <TreeItemLogpresso id="system" label="시스템 로그" icon={<Folder />}>
    <TreeItemLogpresso label="웹서버" icon={<FileText />} />
  </TreeItemLogpresso>
</TreeLogpresso>`;

const themeToggleCode = `import { ThemeToggle } from './components/ThemeToggle';

// <html data-theme="dark"> 값을 다크/라이트로 전환
<ThemeToggle />`;

const treeChain = [
  {name: 'TreeLogpresso (Lab)'},
  {name: 'RAC TreeProps', note: 'children 재정의'},
  {name: 'AriaTreeProps'},
  {name: 'react-stately useTreeState'}
];

const treeGroups = [
  {
    source: 'MultipleSelection',
    props: [
      {name: 'selectionMode', desc: 'single / multiple / none'},
      {name: 'selectedKeys / defaultSelectedKeys', desc: '선택된 키 제어'},
      {name: 'onSelectionChange', desc: '선택 변경 시 호출'},
      {name: 'disabledKeys', desc: '비활성화할 키 목록'},
      {name: 'disallowEmptySelection', desc: '빈 선택 허용 여부'}
    ]
  },
  {
    source: 'Expandable',
    props: [
      {name: 'defaultExpandedKeys', desc: '초기 펼침 키 목록'},
      {name: 'expandedKeys', desc: '펼침 상태 제어'},
      {name: 'onExpandedChange', desc: '펼침 상태 변경 시 호출'}
    ]
  },
  {
    source: 'CollectionProps',
    props: [
      {name: 'items', desc: '동적 컬렉션 데이터'},
      {name: 'children', desc: '정적 TreeItem 구성'},
      {name: 'aria-label', desc: '트리 라벨 (필수)'}
    ]
  },
  {
    source: 'AriaTreeProps (자체)',
    props: [
      {name: 'disabledBehavior', desc: 'selection / all 중 비활성 동작'},
      {name: 'dragAndDropHooks', desc: '드래그 앤 드롭 연결'}
    ]
  }
];

const itemChain = [
  {name: 'TreeItemLogpresso (Lab)'},
  {name: 'RAC TreeItemProps'},
  {name: 'AriaTreeItemOptions'}
];

const itemGroups = [
  {
    source: 'RAC TreeItemProps (자체)',
    props: [
      {name: 'id', desc: '행의 고유 키'},
      {name: 'label', desc: '표시 라벨 (Logpresso 확장)'},
      {name: 'icon', desc: '노드 앞 아이콘 (Logpresso 확장)'},
      {name: 'isDisabled', desc: '비활성화 여부'},
      {name: 'onAction', desc: '행 액션 시 호출'}
    ]
  },
  {
    source: 'AriaTreeItemOptions',
    props: [
      {name: 'hasChildItems', desc: '아직 로드되지 않은 자식 유무'},
      {name: 'focusMode', desc: 'focus 동작 방식'},
      {name: 'allowsArrowNavigation', desc: '화살표 키 탐색 허용'}
    ]
  },
  {
    source: 'StyleRenderProps / LinkDOMProps',
    props: [
      {name: 'className', desc: '행 상태 기반 스타일 함수'},
      {name: 'href / target', desc: '링크로 렌더'}
    ]
  }
];

interface LogTree {
  id?: string;
  label: string;
  icon: 'folder' | 'file';
  children?: LogTree[];
}

const logSources: LogTree[] = [
  {
    id: 'security',
    label: '보안 로그',
    icon: 'folder',
    children: [
      {
        id: 'security-auth',
        label: '인증 이벤트',
        icon: 'folder',
        children: [
          {label: '로그인 성공', icon: 'file'},
          {label: '로그인 실패', icon: 'file'}
        ]
      },
      {
        id: 'security-fw',
        label: '방화벽',
        icon: 'folder',
        children: [{label: '차단 이벤트', icon: 'file'}]
      }
    ]
  },
  {
    id: 'system',
    label: '시스템 로그',
    icon: 'folder',
    children: [
      {label: '웹서버', icon: 'file'},
      {label: '데이터베이스', icon: 'file'}
    ]
  },
  {
    id: 'db',
    label: '데이터베이스 로그',
    icon: 'folder',
    children: [
      {label: 'MySQL', icon: 'file'},
      {label: 'PostgreSQL', icon: 'file'}
    ]
  }
];

function iconFor(type: LogTree['icon']) {
  if (type === 'file') return <FileText />;
  return <Folder />;
}

function LogTreeNode({node}: {node: LogTree}) {
  return (
    <TreeItemLogpresso id={node.id} label={node.label} icon={iconFor(node.icon)}>
      {node.children?.map((child, i) => (
        <LogTreeNode key={child.id ?? `${node.id}-${i}`} node={child} />
      ))}
    </TreeItemLogpresso>
  );
}

function filterTree(nodes: LogTree[], query: string): LogTree[] {
  if (!query) return nodes;
  const result: LogTree[] = [];
  for (const node of nodes) {
    const filteredChildren = node.children ? filterTree(node.children, query) : [];
    if (node.label.toLowerCase().includes(query.toLowerCase()) || filteredChildren.length > 0) {
      result.push({...node, children: filteredChildren});
    }
  }
  return result;
}

function RenderTree({nodes}: {nodes: LogTree[]}) {
  return (
    <>
      {nodes.map((node, i) => (
        <LogTreeNode key={node.id ?? `${i}`} node={node} />
      ))}
    </>
  );
}

const allKeys = ['security', 'security-auth', 'security-fw', 'system', 'db'];

export default function TreeLogpressoDemo() {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set(allKeys));
  const theme = useLogpressoTheme();
  const isDark = theme === 'dark';
  const filtered = filterTree(logSources, query);
  const expandedKeys = new Set(
    allKeys.filter(
      (k) =>
        expanded.has(k) ||
        (query !== '' && (k === 'security' || k === 'system' || k === 'db'))
    )
  );

  useEffect(() => {
    if (!document.documentElement.getAttribute('data-theme')) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  return (
    <div className={`flex flex-col gap-8 p-6 font-sans ${isDark ? 'bg-[#0b0f15]' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <h1 className={`text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          Tree Logpresso
        </h1>
        <ThemeToggle />
      </div>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          기본 / 검색 / 다중 선택
        </h2>
        <div
          className={`rounded-lg border p-3 ${
            isDark ? 'border-[#151c33] bg-[#0e1322]' : 'border-[#dce2ea] bg-[#f8fafc]'
          }`}>
          <div className="relative mb-2">
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#778293]">
              <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="로그 소스 검색"
              className={`w-full rounded-lg border py-1.5 pl-8 pr-2.5 text-sm outline-none transition placeholder:text-[#778293] ${
                isDark
                  ? 'border-[#2a3340] bg-[#111720] text-[#f2f5f8] focus:border-[#4c8dff]'
                  : 'border-[#dce2ea] bg-white text-[#111827] focus:border-[#2563eb]'
              }`}
            />
          </div>
          <TreeLogpresso
            aria-label="로그 소스"
            selectionMode="multiple"
            expandedKeys={expandedKeys}
            onExpandedChange={(keys) => setExpanded(new Set([...keys].map(String)))}
            className="max-h-[280px]">
            <RenderTree nodes={filtered} />
          </TreeLogpresso>
        </div>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          사용 방법
        </h2>
        <pre
          className={`overflow-x-auto rounded-lg border p-4 text-sm ${
            isDark
              ? 'border-[#151c33] bg-[#0e1322] text-neutral-100'
              : 'border-gray-200 bg-neutral-900 text-neutral-100'
          }`}>
          <code>{usageCode}</code>
        </pre>
        <table className="mt-3 w-full max-w-xl text-sm">
          <thead>
            <tr className={`border-b text-left ${isDark ? 'border-[#2a3340] text-[#aeb8c5]' : 'border-gray-300'}`}>
              <th className="py-2 pr-4 font-semibold">props</th>
              <th className="py-2 pr-4 font-semibold">설명</th>
              <th className="py-2 font-semibold">기본값</th>
            </tr>
          </thead>
          <tbody>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">selectionMode</td>
              <td className="py-2 pr-4">single / multiple / none (체크박스 표시)</td>
              <td className="py-2 font-mono text-xs">none</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">defaultExpandedKeys</td>
              <td className="py-2 pr-4">초기 펼침 노드 id 목록</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">aria-label</td>
              <td className="py-2 pr-4">트리 라벨 (스크린리더 필수)</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">label (TreeItem)</td>
              <td className="py-2 pr-4">행에 표시할 라벨 텍스트</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className={isDark ? 'text-[#ebebeb]' : ''}>
              <td className="py-2 pr-4 font-mono text-xs">icon (TreeItem)</td>
              <td className="py-2 pr-4">노드 앞 아이콘 (lucide-react 등)</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
          </tbody>
        </table>
        <p className={`mt-3 text-sm ${isDark ? 'text-[#778293]' : 'text-[#111827]/70'}`}>
          React Aria Tree 기반의 계층형 목록입니다. 부모 노드의 ▸ 버튼으로 접고 펼치고, 행 앞
          체크박스로 여러 노드를 선택할 수 있습니다. 검색창으로 로그 소스 트리를 실시간
          필터링합니다. 테마는 <code className="font-mono text-xs">&lt;html data-theme&gt;</code>{' '}
          값을 자동 감지하므로 theme prop이 필요 없습니다. 우측 상단의 ThemeToggle로
          data-theme을 바로 바꿔볼 수 있습니다.
        </p>
        <pre
          className={`mt-4 overflow-x-auto rounded-lg border p-4 text-sm ${
            isDark
              ? 'border-[#151c33] bg-[#0e1322] text-neutral-100'
              : 'border-gray-200 bg-neutral-900 text-neutral-100'
          }`}>
          <code>{themeToggleCode}</code>
        </pre>
        <PropsInheritance
          chain={treeChain}
          groups={treeGroups}
          docsUrl="https://react-aria.adobe.com/Tree#api"
        />
        <PropsInheritance
          chain={itemChain}
          groups={itemGroups}
          customProps={[
            {name: 'label', desc: '행에 표시할 라벨 텍스트'},
            {name: 'icon', desc: '노드 앞 아이콘'}
          ]}
          docsUrl="https://react-aria.adobe.com/Tree#treeitem"
        />
      </section>
    </div>
  );
}