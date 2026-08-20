import {useEffect, useRef} from 'react';
import {
  ToastLogpressoProvider,
  ToastLogpressoRegion,
  useToastLogpressoQueue,
  type ToastLogpressoState
} from './components/ToastLogpresso';
import {ButtonLogpresso} from './components/ButtonLogpresso';
import {ThemeToggle} from './components/ThemeToggle';
import {PropsInheritance} from './components/PropsInheritance';
import {useLogpressoTheme} from './components/utils';

const usageCode = `import {useEffect, useRef} from 'react';
import {
  ToastLogpressoProvider,
  ToastLogpressoRegion,
  useToastLogpressoQueue
} from './components/ToastLogpresso';

function App() {
  return (
    <ToastLogpressoProvider>
      <ToastLogpressoRegion />
      <MyPage />
    </ToastLogpressoProvider>
  );
}

function MyPage() {
  const queue = useToastLogpressoQueue();
  const didShow = useRef(false);

  useEffect(() => {
    if (!didShow.current) {
      didShow.current = true;
      // 페이지 진입 시 자동으로 보여줄 Toast
      queue.add(
        {title: '안내', message: '3초 후 자동으로 닫힙니다.', state: 'info'},
        {timeout: 3000}
      );
      queue.add({title: '알림', message: '수동으로 닫아야 합니다.', state: 'neutral'});
    }
  }, [queue]);

  return (
    <button
      onClick={() =>
        queue.add({
          title: '완료',
          message: '저장되었습니다.',
          state: 'success'
        })
      }>
      토스트 보여주기
    </button>
  );
}`;

const toastChain = [{name: 'ToastLogpresso (Lab)'}, {name: 'AriaToastProps'}, {name: 'AriaToastRegionProps'}];

const toastGroups = [
  {
    source: 'AriaToastProps',
    props: [
      {name: 'toast', desc: 'QueuedToast<ToastLogpressoContent> 객체'},
      {name: 'aria-label', desc: '스크린리더용 라벨'}
    ]
  },
  {
    source: 'AriaToastRegionProps',
    props: [{name: 'aria-label', desc: 'Toast region 라벨 (기본 Notifications)'}]
  }
];

const sampleToasts: {state: ToastLogpressoState; title: string; message: string}[] = [
  {state: 'error', title: '오류', message: '요청을 처리할 수 없습니다.'},
  {state: 'warning', title: '경고', message: '설정을 확인하세요.'},
  {state: 'success', title: '완료', message: '저장되었습니다.'},
  {state: 'info', title: '안내', message: '새로운 기능이 추가되었습니다.'},
  {state: 'system', title: '시스템', message: '서비스가 재시작됩니다.'},
  {state: 'neutral', title: '알림', message: '백그라운드 작업이 실행 중입니다.'}
];

export default function ToastLogpressoDemo() {
  const theme = useLogpressoTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!document.documentElement.getAttribute('data-theme')) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  return (
    <ToastLogpressoProvider>
      <ToastLogpressoDemoContent isDark={isDark} />
    </ToastLogpressoProvider>
  );
}

function ToastLogpressoDemoContent({isDark}: {isDark: boolean}) {
  const queue = useToastLogpressoQueue();
  const didShow = useRef(false);

  useEffect(() => {
    if (!didShow.current) {
      didShow.current = true;
      queue.add(
        {title: '안내', message: '3초 후 자동으로 닫힙니다.', state: 'info'},
        {timeout: 3000}
      );
      queue.add({title: '알림', message: '수동으로 닫아야 합니다.', state: 'neutral'});
    }
  }, [queue]);

  return (
    <div
      className={`relative flex min-h-full flex-col gap-8 p-6 font-sans ${
        isDark ? 'bg-[#0b0f15]' : 'bg-white'
      }`}>
      <ToastLogpressoRegion />

      <div className="flex items-center justify-between">
        <h1 className={`text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          Toast Logpresso
        </h1>
        <ThemeToggle />
      </div>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          시작 시 자동 Toast
        </h2>
        <p className={`text-sm ${isDark ? 'text-[#f2f5f8]' : 'text-[#111827]'}`}>
          이 페이지에 들어오면 자동으로 두 개의 Toast가 표시됩니다.
        </p>
        <p className={`text-sm ${isDark ? 'text-[#778293]' : 'text-[#6b7280]'}`}>
          - info Toast는 3초 후에 자동으로 닫힙니다.
        </p>
        <p className={`text-sm ${isDark ? 'text-[#778293]' : 'text-[#6b7280]'}`}>
          - neutral Toast는 닫기 버튼을 누르기 전까지 계속 남아 있습니다.
        </p>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          상태별 Toast
        </h2>
        <ButtonLogpresso
          key='TEST'
          variant='default'
          size="small"
          onPress={() => queue.add(
            {
              title: '완료',
              message: '저장되었습니다.',
              state: 'success'
            }
          )}>
          추가
        </ButtonLogpresso>

        <div className="flex flex-wrap gap-3">
          {sampleToasts.map((item) => (
            <ButtonLogpresso
              key={item.state}
              variant={item.state === 'neutral' ? 'default' : 'primary'}
              size="small"
              onPress={() => queue.add(item)}>
              {item.state} 추가
            </ButtonLogpresso>
          ))}
          <ButtonLogpresso
            variant="text"
            size="small"
            onPress={() => sampleToasts.forEach((item) => queue.add(item))}>
            모두 추가
          </ButtonLogpresso>
        </div>
        <p className={`mt-3 text-xs ${isDark ? 'text-[#778293]' : 'text-[#6b7280]'}`}>
          버튼을 누르면 우측 하단에 새 Toast가 추가됩니다. 닫기 아이콘을 클릭하면 Toast가
          사라집니다. "모두 추가"를 누르면 6가지 상태를 한 번에 볼 수 있습니다.
        </p>
      </section>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          auto dismiss
        </h2>
        <div className="flex flex-wrap gap-3">
          <ButtonLogpresso
            variant="primary"
            size="small"
            onPress={() =>
              queue.add(
                {
                  state: 'success',
                  title: '3초 후 닫힘',
                  message: 'timeout 옵션을 사용하면 자동으로 닫힙니다.'
                },
                {timeout: 3000}
              )
            }>
            3초 후 닫히는 Toast
          </ButtonLogpresso>
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
            <tr
              className={`border-b ${
                isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'
              }`}>
              <td className="py-2 pr-4 font-mono text-xs">title</td>
              <td className="py-2 pr-4">Toast 제목</td>
              <td className="py-2 font-mono text-xs">—</td>
            </tr>
            <tr
              className={`border-b ${
                isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'
              }`}>
              <td className="py-2 pr-4 font-mono text-xs">message</td>
              <td className="py-2 pr-4">Toast 본문</td>
              <td className="py-2 font-mono text-xs">—</td>
            </tr>
            <tr
              className={`border-b ${
                isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'
              }`}>
              <td className="py-2 pr-4 font-mono text-xs">state</td>
              <td className="py-2 pr-4">error / warning / success / info / system / neutral</td>
              <td className="py-2 font-mono text-xs">info</td>
            </tr>
            <tr className={isDark ? 'text-[#ebebeb]' : ''}>
              <td className="py-2 pr-4 font-mono text-xs">timeout</td>
              <td className="py-2 pr-4">자동 닫힘 시간(ms). 미지정 시 수동 닫기만 가능</td>
              <td className="py-2 font-mono text-xs">undefined</td>
            </tr>
          </tbody>
        </table>
        <p className={`mt-3 text-sm ${isDark ? 'text-[#778293]' : 'text-[#111827]/70'}`}>
          셸 크기는 600×64, leading icon + title/message + dismiss icon 3-part 구조를 가집니다.
          색상·타이포·그림자는 Logpresso Toast 문서의 state별 spec을 따릅니다.
        </p>
        <PropsInheritance
          chain={toastChain}
          groups={toastGroups}
          customProps={[
            {name: 'title', desc: 'Toast 제목', default: '—'},
            {name: 'message', desc: 'Toast 본문', default: '—'},
            {name: 'state', desc: 'error / warning / success / info / system / neutral', default: 'info'}
          ]}
          docsUrl="https://react-aria.adobe.com/react-aria/useToast.html"
        />
      </section>
    </div>
  );
}
