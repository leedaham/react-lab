import {useState} from 'react';
import {Checkbox} from './components/Checkbox';
import {CheckboxGroup} from './components/CheckboxGroup';
import {PropsInheritance} from './components/PropsInheritance';

const usageCode = `import { Checkbox } from './components/Checkbox';
import { CheckboxGroup } from './components/CheckboxGroup';

// 단일 체크박스
<Checkbox defaultSelected>동의합니다</Checkbox>

// 그룹 (다중 선택)
<CheckboxGroup label="관심 분야" value={selected} onChange={setSelected}>
  <Checkbox value="react">React</Checkbox>
  <Checkbox value="ts">TypeScript</Checkbox>
  <Checkbox value="design">디자인</Checkbox>
</CheckboxGroup>`;

const checkboxChain = [
  {name: 'Checkbox (Lab)'},
  {name: 'RAC CheckboxFieldProps'},
  {name: 'AriaCheckboxProps'},
  {name: 'react-stately ToggleState'}
];

const checkboxGroups = [
  {
    source: 'ToggleProps (react-stately)',
    props: [
      {name: 'isSelected', desc: '선택 상태 (제어)'},
      {name: 'defaultSelected', desc: '초기 선택 여부 (비제어)'},
      {name: 'onChange', desc: '선택 변경 시 호출 (boolean)'}
    ]
  },
  {
    source: 'AriaCheckboxProps (자체)',
    props: [
      {name: 'isIndeterminate', desc: '중간 상태 (일부 선택)'},
      {name: 'value', desc: '폼 제출용 값'},
      {name: 'name', desc: '폼 필드 이름'}
    ]
  },
  {
    source: 'InputBase / ValueBase',
    props: [
      {name: 'isDisabled', desc: '비활성 상태'},
      {name: 'isReadOnly', desc: '읽기 전용'},
      {name: 'isRequired', desc: '필수 항목 여부'}
    ]
  },
  {
    source: 'Validation',
    props: [
      {name: 'isInvalid', desc: '오류 상태'},
      {name: 'validate', desc: '사용자 정의 검증 함수'},
      {name: 'validationBehavior', desc: 'aria / native 검증 방식'}
    ]
  },
  {
    source: 'HelpTextProps / LabelableProps',
    props: [
      {name: 'description', desc: '설명 텍스트'},
      {name: 'errorMessage', desc: '오류 메시지'}
    ]
  },
  {
    source: 'HoverEvents',
    props: [
      {name: 'onHoverStart', desc: '마우스 진입 시 호출'},
      {name: 'onHoverEnd', desc: '마우스 이탈 시 호출'},
      {name: 'onHoverChange', desc: '호버 상태 변경 시 호출'}
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
    source: 'AriaLabelingProps',
    props: [
      {name: 'aria-label', desc: '스크린리더용 라벨'},
      {name: 'aria-labelledby', desc: '라벨 요소 연결'},
      {name: 'aria-describedby', desc: '설명 요소 연결'}
    ]
  }
];

const topics = [
  {id: 'react', name: 'React'},
  {id: 'ts', name: 'TypeScript'},
  {id: 'design', name: '디자인'},
  {id: 'backend', name: '백엔드'}
];

export default function CheckboxDemo() {
  const [selected, setSelected] = useState<string[]>(['react']);
  const [agree, setAgree] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="mb-3 text-lg font-semibold">기본 상태</h2>
        <div className="flex flex-col gap-3">
          <Checkbox defaultSelected>선택됨</Checkbox>
          <Checkbox>선택 안 됨</Checkbox>
          <Checkbox isIndeterminate>일부 선택 (indeterminate)</Checkbox>
          <Checkbox defaultSelected isDisabled>
            선택 + 비활성
          </Checkbox>
          <Checkbox isDisabled>비활성</Checkbox>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">크기</h2>
        <div className="flex flex-col gap-3">
          <Checkbox defaultSelected size="medium">
            Medium (18px)
          </Checkbox>
          <Checkbox defaultSelected size="small">
            Small (16px)
          </Checkbox>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">설명 / 오류</h2>
        <div className="flex flex-col gap-4">
          <Checkbox description="마케팅 소식을 이메일로 받아봅니다.">
            뉴스레터 구독
          </Checkbox>
          <Checkbox errorMessage="이 항목은 동의가 필요합니다." isInvalid>
            서비스 약관 동의
          </Checkbox>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">체크박스 그룹 (다중 선택)</h2>
        <CheckboxGroup label="관심 분야" value={selected} onChange={setSelected}>
          {topics.map((topic) => (
            <Checkbox key={topic.id} value={topic.id}>
              {topic.name}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <p className="mt-2 text-sm text-gray-600">
          선택된 항목: {selected.length > 0 ? selected.join(', ') : '없음'}
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">제어되는 체크박스</h2>
        <div className="flex flex-col gap-3">
          <Checkbox isSelected={agree} onChange={setAgree}>
            {agree ? '동의됨' : '동의 필요'}
          </Checkbox>
          <p className="text-sm text-gray-600">
            상태: {agree ? '동의했습니다' : '아직 동의하지 않았습니다'}
          </p>
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
              <td className="py-2 pr-4 font-mono text-xs">size</td>
              <td className="py-2 pr-4">medium / small</td>
              <td className="py-2 font-mono text-xs">medium</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">defaultSelected</td>
              <td className="py-2 pr-4">초기 선택 여부</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">isSelected</td>
              <td className="py-2 pr-4">선택 상태 (제어)</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">isIndeterminate</td>
              <td className="py-2 pr-4">중간 상태 (일부 선택)</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">isDisabled</td>
              <td className="py-2 pr-4">비활성 상태</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-2 pr-4 font-mono text-xs">onChange</td>
              <td className="py-2 pr-4">선택 변경 시 호출</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-mono text-xs">description</td>
              <td className="py-2 pr-4">하단 설명 텍스트</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-3 text-sm text-gray-600">
          Tab 키로 이동하면 키보드 포커스 링이 보입니다. Space 키로 선택/해제할 수 있고, 화살표 키로
          그룹 안에서 이동할 수 있습니다.
        </p>
        <PropsInheritance
          chain={checkboxChain}
          groups={checkboxGroups}
          customProps={[
            {name: 'size', desc: 'medium / small', default: 'medium'},
            {name: 'children', desc: '라벨 텍스트'}
          ]}
          docsUrl="https://react-aria.adobe.com/Checkbox#api"
        />
      </section>
    </div>
  );
}
