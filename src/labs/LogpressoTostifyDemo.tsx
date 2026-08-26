import 'react-toastify/dist/ReactToastify.css';
import './styles/LogpressoToastifyTheme.css';
import {ToastContainer, toast, type ToastContainerProps} from 'react-toastify';
import {ButtonLogpresso} from './components/ButtonLogpresso';
import {ThemeToggle} from './components/ThemeToggle';
import {useLogpressoTheme} from './components/utils';
import {useEffect} from 'react';

const usageCode = `import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/LogpressoToastifyTheme.css';

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <button onClick={() => toast.success('저장되었습니다.')}>
        Toast 열기
      </button>
    </>
  );
}`;

const containerProps: ToastContainerProps = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true
};

export default function LogpressoTostifyDemo() {
  const theme = useLogpressoTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!document.documentElement.getAttribute('data-theme')) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  return (
    <div className={`relative flex min-h-full flex-col gap-8 p-6 font-sans ${isDark ? 'bg-[#0b0f15]' : 'bg-white'}`}>
      <ToastContainer {...containerProps} theme={isDark ? 'dark' : 'light'} />

      <div className="flex items-center justify-between">
        <h1 className={`text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          Toastify Logpresso Theme
        </h1>
        <ThemeToggle />
      </div>

      <section>
        <h2 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#ebebeb]' : 'text-[#111827]'}`}>
          상태별 Toast
        </h2>
        <div className="flex flex-wrap gap-3">
          <ButtonLogpresso variant="primary" size="small" onPress={() => toast.success('저장되었습니다.')}>
            success
          </ButtonLogpresso>
          <ButtonLogpresso variant="danger" size="small" onPress={() => toast.error('요청을 처리할 수 없습니다.')}>
            error
          </ButtonLogpresso>
          <ButtonLogpresso variant="default" size="small" onPress={() => toast.warning('설정을 확인하세요.')}>
            warning
          </ButtonLogpresso>
          <ButtonLogpresso variant="default" size="small" onPress={() => toast.info('새로운 기능이 추가되었습니다.')}>
            info
          </ButtonLogpresso>
          <ButtonLogpresso variant="text" size="small" onPress={() => toast('기본 Toast 메시지입니다.')}>
            default
          </ButtonLogpresso>
        </div>
        <p className={`mt-3 text-sm ${isDark ? 'text-[#778293]' : 'text-[#111827]/70'}`}>
          버튼을 누르면 우측 하단에 Toast가 표시됩니다. 우측 상단의 Theme Toggle로 라이트/다크 모드를
          바꿔보세요. 테마 전환은 CSS 변수만으로 이루어집니다.
        </p>
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
              <td className="py-2 pr-4 font-mono text-xs">position</td>
              <td className="py-2 pr-4">Toast가 나타나는 위치</td>
              <td className="py-2 font-mono text-xs">top-right</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">autoClose</td>
              <td className="py-2 pr-4">자동 닫힘 시간(ms). false면 수동 닫기</td>
              <td className="py-2 font-mono text-xs">5000</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">hideProgressBar</td>
              <td className="py-2 pr-4">하단 진행 바 숨김 여부</td>
              <td className="py-2 font-mono text-xs">false</td>
            </tr>
            <tr className={`border-b ${isDark ? 'border-[#151c33] text-[#ebebeb]' : 'border-gray-100'}`}>
              <td className="py-2 pr-4 font-mono text-xs">theme</td>
              <td className="py-2 pr-4">ToastContainer 기본 테마 (light / dark / colored)</td>
              <td className="py-2 font-mono text-xs">light</td>
            </tr>
            <tr className={isDark ? 'text-[#ebebeb]' : ''}>
              <td className="py-2 pr-4 font-mono text-xs">className</td>
              <td className="py-2 pr-4">추가 스타일링용 클래스</td>
              <td className="py-2 font-mono text-xs">—</td>
            </tr>
          </tbody>
        </table>
        <p className={`mt-3 text-sm ${isDark ? 'text-[#778293]' : 'text-[#111827]/70'}`}>
          이 데모는 <code className="font-mono text-xs">react-toastify</code>의 기능과 API를 그대로 두고,
          <code className="font-mono text-xs">LogpressoToastifyTheme.css</code>만으로 Logpresso 색상,
          그림자, 반경, 폰트, progress bar 색상을 <code className="font-mono text-xs">data-theme</code>에
          맞게 전환합니다. state별 tinted surface/border는 CSS 변수만으로 불가능해 현재 단계에서 적용하지
          않습니다.
        </p>
      </section>
    </div>
  );
}
