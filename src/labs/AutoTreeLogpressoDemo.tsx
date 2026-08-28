import {Folder, FileText} from 'lucide-react';
import {useEffect, useState} from 'react';
import {AutoTreeLogpresso, AutoTreeItemLogpresso} from './components/AutoTreeLogpresso';
import {ThemeToggle} from './components/ThemeToggle';
import {PropsInheritance} from './components/PropsInheritance';
import {useLogpressoTheme} from './components/utils';

const usageCode = `import { AutoTreeLogpresso, AutoTreeItemLogpresso } from './components/AutoTreeLogpresso';
import { Folder } from 'lucide-react';

// autoExpand 기본값은 true입니다.
// onAction에서 자식을 받아오면 자식이 추가될 때 자동으로 펼쳐집니다.
<AutoTreeLogpresso
  aria-label="자동 펼침 트리"
  selectionMode="none"
>
  <AutoTreeItemLogpresso
    id="security"
    label="보안 로그"
    icon={<Folder />}
    hasChildItems
    onAction={() => loadChildren('security')}
  >
    {/* loadChildren() 완료 후 children으로 자식을 추가하면 자동 펼침 */}
  </AutoTreeItemLogpresso>
</AutoTreeLogpresso>`;

const themeToggleCode = `import { ThemeToggle } from './components/ThemeToggle';

// <html data-theme="dark"> 값을 다크/라이트로 전환
<ThemeToggle />`;

const treeChain = [
  {name: 'AutoTreeLogpresso (Lab)'},
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
  {name: 'AutoTreeItemLogpresso (Lab)'},
  {name: 'RAC TreeItemProps'},
  {name: 'AriaTreeItemOptions'}
];

const itemGroups = [
  {
    source: 'RAC TreeItemProps (자체)',
    props: [
      {name: 'id', desc: '행의 고유 키 (자동 펼침에 필수)'},
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

const lazySources: LogTree[] = [
  {id: 'auto-security', label: '보안 로그 (지연 로딩)', icon: 'folder'},
  {id: 'auto-system', label: '시스템 로그 (지연 로딩)', icon: 'folder'},
  {id: 'auto-db', label: '데이터베이스 로그 (지연 로딩)', icon: 'folder'}
];

function iconFor(type: LogTree['icon']) {
  if (type === 'file') return <FileText />;
  return <Folder />;
}

function LazyTree() {
  const [nodes, setNodes] = useState<LogTree[]>(lazySources);

  const loadChildren = (id: string) => {
    setTimeout(() => {
      setNodes(prev =>
        prev.map(node => {
          if (node.id !== id) return node;
          return {
            ...node,
            children: [
              {label: `${node.label} - 인증`, icon: 'file'},
              {label: `${node.label} - 방화벽`, icon: 'file'}
            ]
          };
        })
      );
    }, 600);
  };

  return (
    <AutoTreeLogpresso aria-label="자동 펼침 지연 로딩 트리" selectionMode="none">
      {nodes.map(node => (
        <AutoTreeItemLogpresso
          key={node.id}
          id={node.id}
          label={node.label}
          icon={iconFor(node.icon)}
          hasChildItems
          onAction={() => {
            if (node.id && !node.children) loadChildren(node.id);
          }}>
          {node.children?.map((child, i) => (
            <AutoTreeItemLogpresso key={i} label={child.label} icon={iconFor(child.icon)} />
          ))}
        </AutoTreeItemLogpresso>
      ))}
    </AutoTreeLogpresso>
  );
}

export default function AutoTreeLogpressoDemo() {
  const theme = useLogpressoTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!document.documentElement.getAttribute('data-theme')) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  return (
    <div className={`flex flex-col gap-8 p-6 font-sans ${isDark ? 'bg-[#0b0f15]' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <h1 className={`text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          Auto Tree Logpresso
        </h1>
        <ThemeToggle />
      </div>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          지연 로딩 + 자동 펼침
        </h2>
        <div
          className={`rounded-lg border p-3 ${
            isDark ? 'border-[#151c33] bg-[#0e1322]' : 'border-[#dce2ea] bg-[#f8fafc]'
          }`}>
          <p className={`mb-2 text-sm ${isDark ? 'text-[#aeb8c5]' : 'text-[#111827]/70'}`}>
            폴더를 클릭하면 0.6초 후 자식이 조회되며, 자식이 추가되면 자동으로 펼쳐집니다.
          </p>
          <LazyTree />
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
              <td className="py-2 pr-4 font-mono text-xs">autoExpand</td>
              <td className="py-2 pr-4">자식이 추가되면 자동으로 펼침</td>
              <td className="py-2 font-mono text-xs">true</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">hasChildItems</td>
              <td className="py-2 pr-4">아직 로드되지 않은 자식이 있음을 표시 (▶ 버튼)</td>
              <td className="py-2 font-mono text-xs">undefined</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">selectionMode</td>
              <td className="py-2 pr-4">single / multiple / none (onAction은 주로 none)</td>
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
          <code className="font-mono text-xs">AutoTreeItemLogpresso</code>는 자식이 처음으로 생길 때
          <code className="font-mono text-xs">autoExpand</code>가 true면 자동으로 펼칩니다. 지연 로딩
          화면에서 onAction으로 데이터를 받아오고, 받아온 후 children으로 자식을 추가하면 별도
          <code className="font-mono text-xs">expandedKeys</code> 관리 없이 자동으로 열립니다.{' '}
          <code className="font-mono text-xs">autoExpand=false</code>로 끌 수 있으며, 테마는{' '}
          <code className="font-mono text-xs">&lt;html data-theme&gt;</code> 값을 자동으로 감지합니다.
          우측 상단의 ThemeToggle로 data-theme을 바로 바꿔볼 수 있습니다.
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
            {name: 'icon', desc: '노드 앞 아이콘'},
            {name: 'autoExpand', desc: '자식이 추가되면 자동으로 펼침 (기본 true)'}
          ]}
          docsUrl="https://react-aria.adobe.com/Tree#treeitem"
        />
      </section>
    </div>
  );
}
