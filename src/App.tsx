import { useState } from 'react'
import { labItems, type LabItem } from './labs/index.tsx'

export default function App() {
  const [active, setActive] = useState(0)
  const ActiveComponent: LabItem['Component'] | undefined = labItems[active]?.Component

  return (
    <div className="lab-layout">
      <aside className="lab-sidebar">
        <h1 className="lab-title">🧪 React Lab</h1>
        <p className="lab-subtitle">컴포넌트를 클릭해 화면에서 확인해보세요.</p>
        <ul className="lab-list">
          {labItems.map((item, index) => (
            <li key={item.path}>
              <button
                className={`lab-list-item ${active === index ? 'active' : ''}`}
                onClick={() => setActive(index)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="lab-preview">
        {ActiveComponent ? (
          <ActiveComponent />
        ) : (
          <p className="lab-empty">표시할 컴포넌트가 없습니다.</p>
        )}
      </main>
    </div>
  )
}