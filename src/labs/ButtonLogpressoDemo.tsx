import {useEffect, useState} from 'react';
import {ButtonLogpresso, type ButtonLogpressoProps} from './components/ButtonLogpresso';
import {ThemeToggle} from './components/ThemeToggle';
import {PropsInheritance} from './components/PropsInheritance';
import {useLogpressoTheme} from './components/utils';

const usageCode = `import { ButtonLogpresso } from './components/ButtonLogpresso';

// 테마는 <html data-theme="dark"> 값을 자동으로 감지합니다.
<ButtonLogpresso variant="primary" size="medium" onPress={() => console.log('clicked')}>
  저장
</ButtonLogpresso>`;

const buttonChain = [
  {name: 'ButtonLogpresso (Lab)'},
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

export default function ButtonLogpressoDemo() {
  const variants: ButtonLogpressoProps['variant'][] = ['default', 'primary', 'text', 'danger'];
  const sizes: ButtonLogpressoProps['size'][] = ['large', 'medium', 'small', 'xsmall'];
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
          Button Logpresso
        </h1>
        <ThemeToggle />
      </div>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          변형 &amp; 크기
        </h2>
        <div className="flex flex-wrap items-end gap-4">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col gap-3">
              {sizes.map((size) => (
                <ButtonLogpresso key={size} variant={variant} size={size}>
                  {variant} / {size}
                </ButtonLogpresso>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          비활성 / 로딩 상태
        </h2>
        <div className="flex flex-wrap gap-3">
          <ButtonLogpresso  variant="primary" isDisabled>
            비활성
          </ButtonLogpresso>
          <ButtonLogpresso  variant="default" isDisabled>
            비활성
          </ButtonLogpresso>
          <ButtonLogpresso  variant="danger" isDisabled>
            비활성
          </ButtonLogpresso>
          <ButtonLogpresso  variant="primary" isPending>
            저장 중
          </ButtonLogpresso>
          <ButtonLogpresso  variant="default" isPending>
            확인 중
          </ButtonLogpresso>
        </div>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          드롭다운 연결
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLogpresso
            
            variant="default"
            size="small"
            hasDropdown
            onPress={() => setDropdownOpen((open) => !open)}>
            Tenant
          </ButtonLogpresso>
          <ButtonLogpresso
            
            variant="primary"
            size="small"
            hasDropdown
            onPress={() => setDropdownOpen((open) => !open)}>
            필터 추가
          </ButtonLogpresso>
          <span className={`text-xs ${isDark ? 'text-[#808080]' : 'text-[#6b7280]'}`}>
            화살표 버튼: {dropdownOpen ? '선택됨' : '닫힘'} (클릭해 토글)
          </span>
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
              <td className="py-2 pr-4 font-mono text-xs">variant</td>
              <td className="py-2 pr-4">default / primary / text / danger</td>
              <td className="py-2 font-mono text-xs">primary</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">size</td>
              <td className="py-2 pr-4">large / medium / small / xsmall</td>
              <td className="py-2 font-mono text-xs">medium</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">hasDropdown</td>
              <td className="py-2 pr-4">우측에 드롭다운 화살표 표시</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">isDisabled</td>
              <td className="py-2 pr-4">비활성 상태</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
            <tr className={isDark ? 'text-[#ebebeb]' : ''}>
              <td className="py-2 pr-4 font-mono text-xs">isPending</td>
              <td className="py-2 pr-4">로딩 스피너 표시</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
          </tbody>
        </table>
        <p className={`mt-3 text-sm ${isDark ? 'text-[#778293]' : 'text-[#111827]/70'}`}>
          Tab 키로 이동하면 키보드 포커스 링이 보입니다. 색상·높이·패딩은 Logpresso Button
          문서의 variant/size/state recipe를 따릅니다. 테마는{' '}
          <code className="font-mono text-xs">&lt;html data-theme&gt;</code> 값을 자동 감지하며,
          우측 상단의 ThemeToggle로 바로 바꿔볼 수 있습니다.
        </p>
        <PropsInheritance
          chain={buttonChain}
          groups={buttonGroups}
          customProps={[
            {name: 'variant', desc: 'default / primary / text / danger', default: 'primary'},
            {name: 'size', desc: 'large / medium / small / xsmall', default: 'medium'},
            {name: 'hasDropdown', desc: '우측 드롭다운 화살표 표시', default: 'false'}
          ]}
          docsUrl="https://react-aria.adobe.com/Button#api"
        />
      </section>
    </div>
  );
}
