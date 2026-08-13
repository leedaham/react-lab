import {useState} from 'react';
import {LogpressoButton, type LogpressoButtonProps} from './components/LogpressoButton';
import {PropsInheritance} from './components/PropsInheritance';

const usageCode = `import { LogpressoButton } from './components/LogpressoButton';

<LogpressoButton variant="primary" size="medium" onPress={() => console.log('clicked')}>
  저장
</LogpressoButton>`;

const buttonChain = [
  {name: 'LogpressoButton (Lab)'},
  {name: 'RAC ButtonProps'},
  {name: 'AriaButtonProps'}
];

const buttonGroups = [
  {
    source: 'PressEvents',
    props: [
      {name: 'onPress', desc: '클릭/엔터/스페이스 시 호출'},
      {name: 'onPressStart/End', desc: '누르기 시작/끝 시 호출'},
      {name: 'onPressChange', desc: '누름 상태 변경 시 호출'},
      {name: 'onPressUp', desc: '누름 해제 시 호출'}
    ]
  },
  {
    source: 'FocusableProps',
    props: [
      {name: 'onFocus', desc: '포커스 진입 시 호출'},
      {name: 'onBlur', desc: '포커스 이탈 시 호출'},
      {name: 'onKeyDown/Up', desc: '키 입력 시 호출'}
    ]
  },
  {
    source: 'AriaBaseButtonProps',
    props: [
      {name: 'type', desc: 'button / submit / reset'},
      {name: 'aria-label', desc: '스크린리더용 라벨'},
      {name: 'aria-expanded', desc: '확장 상태 표시'},
      {name: 'aria-haspopup', desc: '팝업 종류 표시'}
    ]
  },
  {
    source: 'RAC ButtonProps',
    props: [
      {name: 'isPending', desc: '로딩 스피너 표시'},
      {name: 'className', desc: '함수형 클래스(상태 기반 스타일)'}
    ]
  }
];

export default function LogpressoButtonDemo() {
  const variants: LogpressoButtonProps['variant'][] = ['default', 'primary', 'text', 'danger'];
  const sizes: LogpressoButtonProps['size'][] = ['large', 'medium', 'small', 'xsmall'];
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8 bg-[#070b13] p-6">
      <section>
        <h2 className="mb-3 text-sm font-medium text-[#ebebeb]">변형 &amp; 크기</h2>
        <div className="flex flex-wrap items-end gap-4">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col gap-3">
              {sizes.map((size) => (
                <LogpressoButton key={size} variant={variant} size={size}>
                  {variant} / {size}
                </LogpressoButton>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium text-[#ebebeb]">비활성 / 로딩 상태</h2>
        <div className="flex flex-wrap gap-3">
          <LogpressoButton variant="primary" isDisabled>
            비활성
          </LogpressoButton>
          <LogpressoButton variant="default" isDisabled>
            비활성
          </LogpressoButton>
          <LogpressoButton variant="danger" isDisabled>
            비활성
          </LogpressoButton>
          <LogpressoButton variant="primary" isPending>
            저장 중
          </LogpressoButton>
          <LogpressoButton variant="default" isPending>
            확인 중
          </LogpressoButton>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium text-[#ebebeb]">드롭다운 연결</h2>
        <div className="flex flex-wrap gap-3">
          <LogpressoButton
            variant="default"
            size="small"
            hasDropdown
            onPress={() => setDropdownOpen((open) => !open)}>
            Tenant
          </LogpressoButton>
          <LogpressoButton variant="primary" size="small" hasDropdown onPress={() => setDropdownOpen((open) => !open)}>
            필터 추가
          </LogpressoButton>
          <span className="text-xs text-[#808080]">
            화살표 버튼: {dropdownOpen ? '선택됨' : '닫힘'} (클릭해 토글)
          </span>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium text-[#ebebeb]">사용 방법</h2>
        <pre className="overflow-x-auto rounded-lg border border-[#151c33] bg-[#0e1322] p-4 text-sm text-neutral-100">
          <code>{usageCode}</code>
        </pre>
        <table className="mt-3 w-full max-w-xl text-sm">
          <thead>
            <tr className="border-b border-[#2a3340] text-left text-[#aeb8c5]">
              <th className="py-2 pr-4 font-semibold">props</th>
              <th className="py-2 pr-4 font-semibold">설명</th>
              <th className="py-2 font-semibold">기본값</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#151c33] text-[#ebebeb]">
              <td className="py-2 pr-4 font-mono text-xs">variant</td>
              <td className="py-2 pr-4">default / primary / text / danger</td>
              <td className="py-2 font-mono text-xs">primary</td>
            </tr>
            <tr className="border-b border-[#151c33] text-[#ebebeb]">
              <td className="py-2 pr-4 font-mono text-xs">size</td>
              <td className="py-2 pr-4">large / medium / small / xsmall</td>
              <td className="py-2 font-mono text-xs">medium</td>
            </tr>
            <tr className="border-b border-[#151c33] text-[#ebebeb]">
              <td className="py-2 pr-4 font-mono text-xs">hasDropdown</td>
              <td className="py-2 pr-4">우측에 드롭다운 화살표 표시</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
            <tr className="border-b border-[#151c33] text-[#ebebeb]">
              <td className="py-2 pr-4 font-mono text-xs">isDisabled</td>
              <td className="py-2 pr-4">비활성 상태</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
            <tr className="text-[#ebebeb]">
              <td className="py-2 pr-4 font-mono text-xs">isPending</td>
              <td className="py-2 pr-4">로딩 스피너 표시</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-3 text-sm text-[#808080]">
          Tab 키로 이동하면 키보드 포커스 링이 보입니다. 색상·높이·패딩은 Logpresso Button
          문서의 variant/size/state recipe를 따릅니다.
        </p>
        <PropsInheritance
          chain={buttonChain}
          groups={buttonGroups}
          docsUrl="https://react-aria.adobe.com/Button#api"
        />
      </section>
    </div>
  );
}
