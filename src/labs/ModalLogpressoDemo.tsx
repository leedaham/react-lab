import {useEffect, useState} from 'react';
import {ButtonLogpresso} from './components/ButtonLogpresso';
import {CheckboxLogpresso} from './components/CheckboxLogpresso';
import {ModalLogpresso} from './components/ModalLogpresso';
import {PropsInheritance} from './components/PropsInheritance';
import {ThemeToggle} from './components/ThemeToggle';
import {useLogpressoTheme} from './components/utils';

const usageCode = `import { ModalLogpresso } from './components/ModalLogpresso';
import { ButtonLogpresso } from './components/ButtonLogpresso';

<ModalLogpresso
  size="600"
  title="사용자 설정"
  caption="기본 정보를 수정합니다."
  trigger={<ButtonLogpresso variant="primary">열기</ButtonLogpresso>}
  onConfirm={() => alert('확인')}
  onCancel={() => alert('취소')}
>
  <p>모달 본문 내용</p>
</ModalLogpresso>`;

const modalChain = [
  {name: 'ModalLogpresso (Lab)'},
  {name: 'RAC DialogTriggerProps'},
  {name: 'RAC ModalOverlayProps'},
  {name: 'RAC DialogProps'},
  {name: 'RAC HeadingProps'}
];

const modalGroups = [
  {
    source: 'DialogTriggerProps (OverlayTriggerProps)',
    props: [
      {name: 'isOpen', desc: '제어 모달 열림 상태'},
      {name: 'defaultOpen', desc: '비제어 모달 초기 열림 상태'},
      {name: 'onOpenChange', desc: '열림 상태 변경 시 호출'}
    ]
  },
  {
    source: 'ModalOverlayProps (AriaModalOverlayProps)',
    props: [
      {name: 'isDismissable', desc: '배경 클릭 시 닫기 허용'},
      {name: 'isKeyboardDismissDisabled', desc: 'Escape 키 닫기 비활성화'},
      {name: 'shouldCloseOnInteractOutside', desc: '외부 영역 클릭 시 닫기 조건'}
    ]
  },
  {
    source: 'DialogProps (AriaDialogProps)',
    props: [
      {name: 'role', desc: 'dialog / alertdialog'},
      {name: 'aria-label', desc: '스크린리더용 라벨'},
      {name: 'aria-labelledby', desc: '제목 요소 연결'}
    ]
  },
  {
    source: 'HeadingProps',
    props: [{name: 'level', desc: '제목 heading 레벨(aria-level)'}]
  }
];

const previewData = [
  {name: 'Admin', role: 'Administrator', modified: '2026-04-20 09:00'},
  {name: 'User A', role: 'Viewer', modified: '2026-04-19 14:30'},
  {name: 'User B', role: 'Editor', modified: '2026-04-18 11:20'},
  {name: 'User C', role: 'Viewer', modified: '2026-04-17 08:45'},
  {name: 'User D', role: 'Editor', modified: '2026-04-16 17:10'}
];

export default function ModalLogpressoDemo() {
  const theme = useLogpressoTheme();
  const isDark = theme === 'dark';
  const [doNotAsk, setDoNotAsk] = useState(false);

  useEffect(() => {
    if (!document.documentElement.getAttribute('data-theme')) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  return (
    <div className={`flex flex-col gap-8 p-6 font-sans ${isDark ? 'bg-[#0b0f15]' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <h1 className={`text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          Modal Logpresso
        </h1>
        <ThemeToggle />
      </div>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          기본 모달 (600px)
        </h2>
        <ModalLogpresso
          size="600"
          title="사용자 설정"
          caption="사용자의 기본 정보를 수정합니다."
          trigger={<ButtonLogpresso variant="primary">기본 모달 열기</ButtonLogpresso>}
          onConfirm={() => alert('확인 버튼')}
          onCancel={() => alert('취소 버튼')}>
          <p className={`text-sm ${isDark ? 'text-[#f2f5f8]' : 'text-[#111827]'}`}>
            모달 본문은 16px inset과 16px block 간격으로 쌓입니다. header에는 accent
            하단 border, footer에는 상단 divider가 있어 Logpresso shell 구조를 따릅니다.
          </p>
          <p className={`text-sm ${isDark ? 'text-[#f2f5f8]' : 'text-[#111827]'}`}>
            ESC 키로 닫을 수 있으며, 배경 클릭은 기본적으로 비활성화되어 있습니다.
          </p>
        </ModalLogpresso>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          크기 variant (360 / 1120)
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <ModalLogpresso
            size="360"
            title="삭제 확인"
            caption="삭제된 데이터는 복구할 수 없습니다."
            confirmLabel="삭제"
            trigger={<ButtonLogpresso variant="danger">360px 경고</ButtonLogpresso>}
            onConfirm={() => alert('삭제')}>
            <p className={`text-sm ${isDark ? 'text-[#f2f5f8]' : 'text-[#111827]'}`}>
              정말로 이 항목을 삭제하시겠습니까?
            </p>
          </ModalLogpresso>

          <ModalLogpresso
            size="1120"
            title="데이터 미리보기"
            caption="최근 10건의 조회 결과입니다."
            trigger={<ButtonLogpresso variant="default">1120px 대화면</ButtonLogpresso>}>
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className={`border-b text-left ${
                      isDark ? 'border-[#2a3340] text-[#aeb8c5]' : 'border-[#dce2ea] text-[#111827]'
                    }`}>
                    <th className="py-2 pr-4">이름</th>
                    <th className="py-2 pr-4">역할</th>
                    <th className="py-2">수정일</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        isDark ? 'border-[#151c33] text-[#f2f5f8]' : 'border-[#dce2ea] text-[#111827]'
                      }`}>
                      <td className="py-2 pr-4">{row.name}</td>
                      <td className="py-2 pr-4">{row.role}</td>
                      <td className="py-2">{row.modified}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ModalLogpresso>
        </div>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          커스텀 footer
        </h2>
        <ModalLogpresso
          size="600"
          title="정책 적용"
          caption="선택한 정책을 모든 사용자에게 적용합니다."
          trigger={<ButtonLogpresso variant="primary">커스텀 footer</ButtonLogpresso>}
          footer={
            <div className="flex w-full items-center justify-between">
              <CheckboxLogpresso
                size="sm"
                isSelected={doNotAsk}
                onChange={(checked) => setDoNotAsk(checked)}>
                다시 묻지 않음
              </CheckboxLogpresso>
              <div className="flex items-center gap-2">
                <ButtonLogpresso variant="default" size="small">
                  취소
                </ButtonLogpresso>
                <ButtonLogpresso variant="primary" size="small">
                  적용
                </ButtonLogpresso>
              </div>
            </div>
          }>
          <p className={`text-sm ${isDark ? 'text-[#f2f5f8]' : 'text-[#111827]'}`}>
            footer prop으로 leading option과 trailing actions를 자유롭게 조합할 수 있습니다.
            footer를 제공하지 않으면 기본 취소/확인 버튼이 표시됩니다.
          </p>
        </ModalLogpresso>
        <p className={`mt-2 text-xs ${isDark ? 'text-[#778293]' : 'text-[#111827]/70'}`}>
          체크박스 상태: {doNotAsk ? 'ON' : 'OFF'}
        </p>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          긴 본문 스크롤
        </h2>
        <ModalLogpresso
          size="600"
          title="이용 약관"
          caption="2026.04.20 개정"
          confirmLabel="동의"
          trigger={<ButtonLogpresso variant="default">스크롤 모달</ButtonLogpresso>}>
          {Array.from({length: 12}).map((_, i) => (
            <p key={i} className={`text-sm ${isDark ? 'text-[#f2f5f8]' : 'text-[#111827]'}`}>
              {i + 1}. 본문은 modalBody 영역 내부에서만 스크롤됩니다. header와 footer는
              고정되며, viewport 높이를 초과할 때 body에만 overflow가 발생합니다.
            </p>
          ))}
        </ModalLogpresso>
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
            <tr
              className={`border-b text-left ${
                isDark ? 'border-[#2a3340] text-[#aeb8c5]' : 'border-gray-300'
              }`}>
              <th className="py-2 pr-4 font-semibold">props</th>
              <th className="py-2 pr-4 font-semibold">설명</th>
              <th className="py-2 font-semibold">기본값</th>
            </tr>
          </thead>
          <tbody>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">size</td>
              <td className="py-2 pr-4">360 / 600 / 880 / 1120</td>
              <td className="py-2 font-mono text-xs">600</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">title</td>
              <td className="py-2 pr-4">모달 header 제목</td>
              <td className="py-2 font-mono text-xs">필수</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">caption</td>
              <td className="py-2 pr-4">header 보조 설명</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">trigger</td>
              <td className="py-2 pr-4">열기 트리거 (ButtonLogpresso 등)</td>
              <td className="py-2 font-mono text-xs">필수</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">footer</td>
              <td className="py-2 pr-4">직접 제공 시 기본 footer 대체</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">cancelLabel</td>
              <td className="py-2 pr-4">기본 취소 버튼 레이블</td>
              <td className="py-2 font-mono text-xs">취소</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">confirmLabel</td>
              <td className="py-2 pr-4">기본 확인 버튼 레이블</td>
              <td className="py-2 font-mono text-xs">확인</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">isDismissable</td>
              <td className="py-2 pr-4">배경 클릭 시 닫기</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
            <tr className={isDark ? 'text-[#ebebeb]' : ''}>
              <td className="py-2 pr-4 font-mono text-xs">isKeyboardDismissDisabled</td>
              <td className="py-2 pr-4">Escape 키 닫기 비활성화</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
          </tbody>
        </table>
        <p className={`mt-3 text-sm ${isDark ? 'text-[#778293]' : 'text-[#111827]/70'}`}>
          Logpresso Modal shell 규칙(16px radius, canvas background, accent header border, 16px
          body inset, footer divider)을 따릅니다. 테마는{' '}
          <code className="font-mono text-xs">&lt;html data-theme&gt;</code> 값을 자동 감지하며,
          우측 상단의 ThemeToggle로 바로 바꿔볼 수 있습니다. header 우측에는 닫기 버튼이,
          footer에는 기본 취소/확인 액션이 있습니다.
        </p>
        <PropsInheritance
          chain={modalChain}
          groups={modalGroups}
          customProps={[
            {name: 'size', desc: '360 / 600 / 880 / 1120', default: '600'},
            {name: 'title', desc: '모달 header 제목'},
            {name: 'caption', desc: 'header 보조 설명'},
            {name: 'trigger', desc: '열기 트리거 (ReactNode)'},
            {name: 'footer', desc: '직접 제공 시 기본 footer 대체'},
            {name: 'cancelLabel', desc: '기본 취소 버튼 레이블', default: '취소'},
            {name: 'confirmLabel', desc: '기본 확인 버튼 레이블', default: '확인'},
            {name: 'isDismissable', desc: '배경 클릭 시 닫기', default: 'false'},
            {name: 'isKeyboardDismissDisabled', desc: 'Escape 키 닫기 비활성화', default: 'false'}
          ]}
          docsUrl="https://react-aria.adobe.com/Modal"
        />
      </section>
    </div>
  );
}
