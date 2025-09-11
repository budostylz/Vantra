// AR Code Hosted in 8 Wall
//https://www.8thwall.com/


/* 
import * as ecs from '@8thwall/ecs'

type P = [number, number]

// small helper to avoid CSSStyleDeclaration casting errors
function setStyles(el: HTMLElement, styles: Record<string, string>) {
  Object.assign((el.style as any), styles)
}

function ensureToast(): HTMLDivElement {
  const id = 'hud-toast'
  let el = document.getElementById(id) as HTMLDivElement | null
  if (!el) {
    el = document.createElement('div')
    el.id = id
    setStyles(el, {
      position: 'fixed',
      top: '16px',
      left: '16px',
      padding: '10px 12px',
      background: 'rgba(0,0,0,.7)',
      color: '#fff',
      borderRadius: '10px',
      fontSize: '14px',
      pointerEvents: 'none',
      zIndex: '9999',
      opacity: '0',
      transition: 'opacity 200ms',
    })
    document.body.appendChild(el)
  }
  return el
}
function toast(msg: string, ttl = 900) {
  const el = ensureToast()
  el.textContent = msg
  el.style.opacity = '1'
  clearTimeout((el as any)._t)
  ;(el as any)._t = setTimeout(() => {
    el.style.opacity = '0'
  }, ttl)
}

function ensureModeSelect(onChange?: () => void) {
  let el = document.getElementById('mode-select') as HTMLDivElement | null
  if (!el) {
    el = document.createElement('div')
    el.id = 'mode-select'
    setStyles(el, {
      position: 'fixed',
      bottom: '16px',
      left: '16px',
      display: 'flex',
      gap: '8px',
      zIndex: '10000',
      background: 'rgba(0,0,0,.6)',
      padding: '8px',
      borderRadius: '10px',
      color: '#fff',
      alignItems: 'center',
      fontSize: '13px',
    })
    const lbl = document.createElement('span')
    lbl.textContent = 'Mode'
    const sel = document.createElement('select')
    sel.id = 'mode-select-el'
    setStyles(sel, {
      background: '#111',
      color: '#fff',
      border: '1px solid #222',
      borderRadius: '8px',
      padding: '6px 10px',
    })
    sel.style.setProperty('appearance', 'none')
    sel.style.setProperty('-webkit-appearance', 'none')
    ;[
      ['scan', 'Live Camera Scan'],
      ['rooms', 'Auto Room Detection'],
      ['debris', 'Debris + Material Detection'],
      ['measure', 'Auto Measure'],
    ].forEach(([v, t]) => {
      const o = document.createElement('option')
      o.value = v
      o.textContent = t
      sel.appendChild(o)
    })
    el.appendChild(lbl)
    el.appendChild(sel)
    document.body.appendChild(el)
  }
  const sel = document.getElementById('mode-select-el') as HTMLSelectElement
  if (onChange) sel.onchange = onChange
  return sel
}

function ensureDragRect(): HTMLDivElement {
  let el = document.getElementById('drag-rect') as HTMLDivElement | null
  if (!el) {
    el = document.createElement('div')
    el.id = 'drag-rect'
    setStyles(el, {
      position: 'fixed',
      left: '0px',
      top: '0px',
      width: '0px',
      height: '0px',
      display: 'none',
      border: '2px solid rgba(80,160,255,.9)',
      background: 'rgba(80,160,255,.25)',
      borderRadius: '6px',
      pointerEvents: 'none',
      zIndex: '9998',
    })
    document.body.appendChild(el)
  }
  return el
}
function ensureDragLabel(): HTMLDivElement {
  let el = document.getElementById('drag-label') as HTMLDivElement | null
  if (!el) {
    el = document.createElement('div')
    el.id = 'drag-label'
    setStyles(el, {
      position: 'fixed',
      padding: '8px 10px',
      background: 'rgba(0,0,0,.78)',
      color: '#fff',
      borderRadius: '10px',
      fontSize: '13px',
      transform: 'translate(-50%,-120%)',
      pointerEvents: 'none',
      zIndex: '9999',
      display: 'none',
      whiteSpace: 'pre',
      textAlign: 'center',
      lineHeight: '1.25',
    })
    document.body.appendChild(el)
  }
  return el
}
function ensureUnitToggle(onChange?: () => void): HTMLButtonElement {
  let el = document.getElementById('unit-toggle') as HTMLButtonElement | null
  if (!el) {
    el = document.createElement('button')
    el.id = 'unit-toggle'
    setStyles(el, {
      position: 'fixed',
      top: '16px',
      right: '16px',
      padding: '6px 10px',
      background: '#111',
      color: '#fff',
      border: '1px solid #222',
      borderRadius: '10px',
      fontSize: '12px',
      zIndex: '10000',
      display: 'none',
    })
    document.body.appendChild(el)
  }
  if (onChange) el.onclick = onChange
  return el
}

async function hitAt(clientX: number, clientY: number) {
  const {XR8} = window as any
  const ctrl = XR8?.XrController
  if (!ctrl?.hitTest) return null
  try {
    const hits = await ctrl.hitTest(clientX / window.innerWidth, clientY / window.innerHeight)
    const h = Array.isArray(hits) && hits.length ? hits[0] : null
    const p = h?.position || h?.pose?.position || h?.worldTransform?.position || null
    return p && typeof p.x === 'number' ? {x: p.x, y: p.y, z: p.z} : null
  } catch {
    return null
  }
}

const FT_PER_M = 3.28084
const M2_TO_FT2 = 10.7639
function usd(n: number) {
  return `$${n.toFixed(2)}`
}
function areaToQuote(areaM2: number) {
  const ft2Raw = areaM2 * M2_TO_FT2
  const ft2 = Math.max(0, Math.round(ft2Raw / 5) * 5)
  const rate = 3.25
  const base = 75
  const extras = 20
  const labor = +(ft2 * rate).toFixed(2)
  const total = +(labor + base + extras).toFixed(2)
  return {ft2, labor, base, extras, total}
}
function formatMeters(m: number) {
  return m < 1 ? `${(m * 100).toFixed(0)} cm` : `${m.toFixed(2)} m`
}
function getUnitMode(): 'metric' | 'us' {
  const saved = localStorage.getItem('unitMode')
  if (saved === 'metric' || saved === 'us') return saved
  const isUS = /^en-US|US/i.test(navigator.language || '')
  return isUS ? 'us' : 'metric'
}
function setUnitMode(mode: 'metric' | 'us') {
  localStorage.setItem('unitMode', mode)
}

ecs.registerComponent({
  name: 'measure',

  add: (world, component) => {
    const rect = ensureDragRect()
    const label = ensureDragLabel()
    const unitBtn = ensureUnitToggle()
    const modeSel = ensureModeSelect()

    function renderLabel(wm: number, lm: number, am2: number, modeUnits: 'metric'|'us'): string {
      const ftW = wm * FT_PER_M
      const ftL = lm * FT_PER_M
      const ft2 = am2 * M2_TO_FT2
      const q = areaToQuote(am2)
      return modeUnits === 'metric'
        ? `${formatMeters(wm)} × ${formatMeters(lm)}\n${am2.toFixed(2)} m² • ${Math.round(ft2)} ft²\nLabor ${usd(q.labor)} + Base ${usd(q.base)} + Extras ${usd(q.extras)} = ${usd(q.total)}`
        : `${ftW.toFixed(2)} ft × ${ftL.toFixed(2)} ft\n${Math.round(ft2)} ft² • ${am2.toFixed(2)} m²\nLabor ${usd(q.labor)} + Base ${usd(q.base)} + Extras ${usd(q.extras)} = ${usd(q.total)}`
    }

    let last: { w: number; l: number; area: number } | null = null
    let unitMode: 'metric' | 'us' = getUnitMode()
    let mode: 'scan'|'rooms'|'debris'|'measure' = 'scan'
    let scanTimer: number | null = null

    const setUnitBtnText = () => {
      unitBtn.textContent = unitMode === 'metric' ? 'Units: Metric' : 'Units: US'
    }
    setUnitBtnText()
    unitBtn.onclick = () => {
      unitMode = unitMode === 'metric' ? 'us' : 'metric'
      setUnitMode(unitMode)
      setUnitBtnText()
      if (last) label.textContent = renderLabel(last.w, last.l, last.area, unitMode)
    }

    const drag = {active: false, id: 0, sx: 0, sy: 0, startW: null as null | { x: number, y: number, z: number }, lastMoveT: 0}
    const updateDomRect = (x: number, y: number, w: number, h: number) => {
      setStyles(rect, {
        display: 'block',
        left: `${x}px`,
        top: `${y}px`,
        width: `${w}px`,
        height: `${h}px`,
      })
      setStyles(label, {
        display: 'block',
        left: `${x + w / 2}px`,
        top: `${y + h / 2}px`,
      })
    }

    const onPointerDown = async (e: PointerEvent) => {
      if (mode !== 'measure') return
      if (!e.isPrimary) return
      drag.active = true
      drag.id = e.pointerId
      drag.sx = e.clientX
      drag.sy = e.clientY
      drag.startW = await hitAt(e.clientX, e.clientY)
      setStyles(rect, {display: 'block'})
      setStyles(label, {display: 'block'})
      updateDomRect(drag.sx, drag.sy, 0, 0)
      if (!drag.startW) toast('Point camera at the floor to detect a plane')
    }
    const onPointerMove = async (e: PointerEvent) => {
      if (mode !== 'measure') return
      if (!drag.active || e.pointerId !== drag.id) return
      const x1 = Math.min(drag.sx, e.clientX)
      const y1 = Math.min(drag.sy, e.clientY)
      const wpx = Math.abs(e.clientX - drag.sx)
      const hpx = Math.abs(e.clientY - drag.sy)
      updateDomRect(x1, y1, wpx, hpx)
      const now = performance.now()
      if (now - drag.lastMoveT < 33) return
      drag.lastMoveT = now
      if (!drag.startW) drag.startW = await hitAt(drag.sx, drag.sy)
      const [pEnd, pBx, pCy] = await Promise.all([
        hitAt(e.clientX, e.clientY),
        hitAt(e.clientX, drag.sy),
        hitAt(drag.sx, e.clientY),
      ])
      if (!drag.startW || !pEnd) {
        label.textContent = '—'; return
      }
      const s = drag.startW
      const bx = pBx || pEnd
      const cy = pCy || pEnd
      const ux = (bx.x - s.x)
      const uz = (bx.z - s.z)
      const vx = (cy.x - s.x)
      const vz = (cy.z - s.z)
      const w = Math.hypot(ux, uz)
      const l = Math.hypot(vx, vz)
      const area = Math.abs(ux * vz - uz * vx)
      last = {w, l, area}
      label.textContent = renderLabel(w, l, area, unitMode)
    }
    const onEnd = (e: PointerEvent) => {
      if (mode !== 'measure') return
      if (!drag.active || e.pointerId !== drag.id) return
      setStyles(rect, {display: 'none'})
      setStyles(label, {display: 'none'})
      drag.active = false
      drag.startW = null
    }

    function onModeChange() {
      const sel = modeSel as HTMLSelectElement
      mode = (sel.value as any) || 'scan'
      if (mode === 'measure') {
        setStyles(unitBtn, {display: 'inline-block'})
        toast('Auto Measure')
      } else {
        setStyles(unitBtn, {display: 'none'})
        setStyles(rect, {display: 'none'})
        setStyles(label, {display: 'none'})
      }
      if (scanTimer) {
        clearInterval(scanTimer); scanTimer = null
      }
      if (mode === 'scan') {
        toast('Live Camera Scan')
        scanTimer = window.setInterval(() => {}, 1500)
      } else if (mode === 'rooms') {
        toast('Auto Room Detection')
      } else if (mode === 'debris') {
        toast('Debris + Material Detection')
      }
    }

    modeSel.value = 'scan'
    ;(modeSel as HTMLSelectElement).onchange = onModeChange
    onModeChange()

    window.addEventListener('pointerdown', onPointerDown, {passive: true})
    window.addEventListener('pointermove', onPointerMove, {passive: true})
    window.addEventListener('pointerup', onEnd, {passive: true})
    window.addEventListener('pointercancel', onEnd, {passive: true})

    ;(component as any)._cleanup = () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onEnd)
      window.removeEventListener('pointercancel', onEnd)
      if (scanTimer) clearInterval(scanTimer)
    }
  },

  remove: (_world, component) => {
    const fn = (component as any)._cleanup
    if (typeof fn === 'function') fn()
  },
})
*/