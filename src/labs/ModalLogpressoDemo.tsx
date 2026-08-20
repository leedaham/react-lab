import {useEffect, useState} from 'react';
import {ButtonLogpresso} from './components/ButtonLogpresso';
import {CheckboxLogpresso} from './components/CheckboxLogpresso';
import {ModalLogpresso} from './components/ModalLogpresso';
import {PropsInheritance} from './components/PropsInheritance';
import {ThemeToggle} from './components/ThemeToggle';
import {useLogpressoTheme} from './components/utils';

const usageCode = `import { ModalLogpresso } from './components/ModalLogpresso';
import { ButtonLogpresso } from './components/ButtonLogpresso';

// 1) trigger 사용 (기존 방식)
<ModalLogpresso
  size="600"
  title="사용자 설정"
  caption="기본 정보를 수정합니다."
  trigger={<ButtonLogpresso variant="primary">열기</ButtonLogpresso>}
  onConfirm={() => alert('확인')}
  onCancel={() => alert('취소')}
>
  <p>모달 본문 내용</p>
</ModalLogpresso>

// 2) trigger 없이 상태로 제어
const [isOpen, setIsOpen] = useState(false);

<button onClick={() => setIsOpen(true)}>열기</button>

<ModalLogpresso
  size="600"
  title="사용자 설정"
  caption="기본 정보를 수정합니다."
  isOpen={isOpen}
  onOpenChange={setIsOpen}
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

  // 상태로 제어하는 모달 상태
  const [selectedRow, setSelectedRow] = useState<(typeof previewData)[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrorOpen, setLoginErrorOpen] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemRole, setNewItemRole] = useState('');

  useEffect(() => {
    if (!document.documentElement.getAttribute('data-theme')) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const inputClass = `w-full rounded-md border px-3 py-2 text-sm outline-none transition ${
    isDark
      ? 'border-[#2a3340] bg-[#151c33] text-[#f2f5f8] placeholder:text-[#778293] focus:border-[#ff692a]'
      : 'border-[#dce2ea] bg-white text-[#111827] placeholder:text-[#9ca3af] focus:border-[#ff692a]'
  }`;

  const handleLogin = () => {
    if (!loginId.trim() || loginPassword.length < 6) {
      setLoginErrorOpen(true);
    } else {
      alert('로그인 성공');
    }
  };

  const handleCreate = () => {
    if (newItemName.trim() && newItemRole.trim()) {
      alert(`${newItemName} (${newItemRole}) 아이템 추가`);
      setNewItemName('');
      setNewItemRole('');
      setCreateOpen(false);
    }
  };

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
          상태로 제어하는 모달
        </h2>
        <p className={`mb-4 text-sm ${isDark ? 'text-[#778293]' : 'text-[#111827]/70'}`}>
          trigger를 생략하면 isOpen/onOpenChange로 모달을 제어합니다. 외부 이벤트(테이블 로우
          클릭, 유효성 검사 실패 등)에서 모달을 열 수 있습니다.
        </p>

        <div className="flex flex-col gap-6">
          <div>
            <h3
              className={`mb-2 text-sm font-medium ${
                isDark ? 'text-[#ebebeb]' : 'text-[#111827]'
              }`}>
              1. 테이블 로우 클릭 → 상세 모달
            </h3>
            <div className="overflow-auto rounded-lg border ${isDark ? 'border-[#151c33]' : 'border-[#dce2ea]'}">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className={`border-b text-left ${
                      isDark ? 'border-[#2a3340] text-[#aeb8c5]' : 'border-[#dce2ea] text-[#111827]'
                    }`}>
                    <th className="py-2 pl-3 pr-4">이름</th>
                    <th className="py-2 pr-4">역할</th>
                    <th className="py-2 pr-3">수정일</th>
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        setSelectedRow(row);
                        setDetailOpen(true);
                      }}
                      className={`cursor-pointer border-b ${
                        isDark
                          ? 'border-[#151c33] text-[#f2f5f8] hover:bg-[#151c33]'
                          : 'border-[#dce2ea] text-[#111827] hover:bg-[#f1f3f7]'
                      }`}>
                      <td className="py-2 pl-3 pr-4">{row.name}</td>
                      <td className="py-2 pr-4">{row.role}</td>
                      <td className="py-2 pr-3">{row.modified}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ModalLogpresso
              size="360"
              title="사용자 상세"
              caption={selectedRow ? `${selectedRow.name}의 상세 정보입니다.` : ''}
              isOpen={detailOpen}
              onOpenChange={setDetailOpen}
              confirmLabel="확인">
              {selectedRow && (
                <div className={`flex flex-col gap-2 text-sm ${isDark ? 'text-[#f2f5f8]' : 'text-[#111827]'}`}>
                  <p>
                    <span className={isDark ? 'text-[#778293]' : 'text-[#6b7280]'}>이름:</span>{' '}
                    {selectedRow.name}
                  </p>
                  <p>
                    <span className={isDark ? 'text-[#778293]' : 'text-[#6b7280]'}>역할:</span>{' '}
                    {selectedRow.role}
                  </p>
                  <p>
                    <span className={isDark ? 'text-[#778293]' : 'text-[#6b7280]'}>수정일:</span>{' '}
                    {selectedRow.modified}
                  </p>
                </div>
              )}
            </ModalLogpresso>
          </div>

          <div>
            <h3
              className={`mb-2 text-sm font-medium ${
                isDark ? 'text-[#ebebeb]' : 'text-[#111827]'
              }`}>
              2. 유효성 검사 실패 → 안내 모달
            </h3>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <input
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="아이디"
                className={inputClass}
              />
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="비밀번호 (6자 이상)"
                className={inputClass}
              />
              <ButtonLogpresso variant="primary" onPress={handleLogin}>
                로그인
              </ButtonLogpresso>
            </div>
            <ModalLogpresso
              size="360"
              title="입력 오류"
              caption="아이디와 비밀번호를 확인해 주세요."
              isOpen={loginErrorOpen}
              onOpenChange={setLoginErrorOpen}
              confirmLabel="확인">
              <p className={`text-sm ${isDark ? 'text-[#f2f5f8]' : 'text-[#111827]'}`}>
                아이디를 입력하고 비밀번호는 6자 이상이어야 합니다.
              </p>
            </ModalLogpresso>
          </div>

          <div>
            <h3
              className={`mb-2 text-sm font-medium ${
                isDark ? 'text-[#ebebeb]' : 'text-[#111827]'
              }`}>
              3. trigger + controlled: 아이템 추가
            </h3>
            <ModalLogpresso
              size="360"
              title="아이템 추가"
              caption="새로운 아이템을 생성합니다."
              isOpen={createOpen}
              onOpenChange={setCreateOpen}
              trigger={<ButtonLogpresso variant="primary">아이템 추가</ButtonLogpresso>}
              footer={
                <div className="ml-auto flex items-center gap-2">
                  <ButtonLogpresso
                    variant="default"
                    size="small"
                    onPress={() => setCreateOpen(false)}>
                    취소
                  </ButtonLogpresso>
                  <ButtonLogpresso variant="primary" size="small" onPress={handleCreate}>
                    추가
                  </ButtonLogpresso>
                </div>
              }>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="아이템 이름"
                  className={inputClass}
                />
                <input
                  type="text"
                  value={newItemRole}
                  onChange={(e) => setNewItemRole(e.target.value)}
                  placeholder="역할 (예: Editor)"
                  className={inputClass}
                />
              </div>
            </ModalLogpresso>
          </div>
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
              <td className="py-2 pr-4">열기 트리거 (ButtonLogpresso 등). 생략 시 isOpen으로 제어</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">isOpen</td>
              <td className="py-2 pr-4">제어 모달 열림 상태</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">onOpenChange</td>
              <td className="py-2 pr-4">열림 상태 변경 시 호출</td>
              <td className="py-2 font-mono text-xs">없음</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">defaultOpen</td>
              <td className="py-2 pr-4">비제어 모달 초기 열림 상태 (trigger 사용 시)</td>
              <td className="py-2 font-mono text-xs">false</td>
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
          footer에는 기본 취소/확인 액션이 있습니다. trigger를 생략하면 외부 상태로 모달을
          열고 닫을 수 있습니다.
        </p>
        <PropsInheritance
          chain={modalChain}
          groups={modalGroups}
          customProps={[
            {name: 'size', desc: '360 / 600 / 880 / 1120', default: '600'},
            {name: 'title', desc: '모달 header 제목'},
            {name: 'caption', desc: 'header 보조 설명'},
            {name: 'trigger', desc: '열기 트리거 (ReactNode). 생략 시 isOpen으로 제어'},
            {name: 'isOpen', desc: '제어 모달 열림 상태'},
            {name: 'onOpenChange', desc: '열림 상태 변경 시 호출'},
            {name: 'defaultOpen', desc: '비제어 모달 초기 열림 상태 (trigger 사용 시)', default: 'false'},
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
