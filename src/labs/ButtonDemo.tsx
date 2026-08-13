import {Button, type ButtonProps} from './components/Button';
import {PropsInheritance} from './components/PropsInheritance';

const usageCode = `import { Button } from './components/Button';

<Button variant="primary" onPress={() => console.log('clicked')}>
  저장
</Button>`;

const buttonChain = [
  {name: 'Button (Lab)'},
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

export default function ButtonDemo() {
  const variants: ButtonProps['variant'][] = ['primary', 'secondary', 'destructive', 'quiet']

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="mb-3 text-lg font-semibold">변형 (Variant)</h2>
        <div className="flex flex-wrap gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-lg font-semibold">비활성 / 대기 상태</h2>
        <div className="flex flex-wrap gap-3">
          <Button isDisabled>비활성 버튼</Button>
          <Button isDisabled variant="quiet">
            비활성(조용)
          </Button>
          <Button>일반 버튼</Button>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">사용 방법</h2>
        <pre className="overflow-x-auto rounded-xl border border-gray-200 bg-neutral-900 p-4 text-sm text-neutral-100">
          <code>{usageCode}</code>
        </pre>
        <table className="mt-3 w-full max-w-xl text-sm">
          <thead>
            <tr className="border-b border-gray-300 text-left">
              <th className="py-2 pr-4 font-semibold">props</th>
              <th className="py-2 pr-4 font-semibold">설명</th>
              <th className="py-2 font-semibold">기본값</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">variant</td>
              <td className="py-2 pr-4">primary / secondary / destructive / quiet</td>
              <td className="py-2 font-mono text-xs">primary</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">isDisabled</td>
              <td className="py-2 pr-4">비활성 상태</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">isPending</td>
              <td className="py-2 pr-4">로딩 스피너 표시</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-3 text-sm text-gray-600">
          Tab 키로 이동하면 키보드 포커스 링이 보입니다. 마우스 클릭 시에는 포커스 링이 표시되지
          않습니다.
        </p>
        <PropsInheritance
          chain={buttonChain}
          groups={buttonGroups}
          docsUrl="https://react-aria.adobe.com/Button#api"
        />
      </section>
    </div>
  )
}
