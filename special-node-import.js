(() => {
  const BUTTON_ID = 'xboard-special-node-import-trigger';
  const MODAL_ID = 'xboard-special-node-import-modal';

  const styles = `
    #${BUTTON_ID}{display:inline-flex;align-items:center;gap:8px;height:38px;padding:0 15px;border:1px solid #315f55;border-radius:8px;background:#315f55;color:#fff;font:600 13px/1 system-ui;cursor:pointer;box-shadow:0 8px 20px rgba(49,95,85,.18);transition:transform .28s cubic-bezier(.22,1,.36,1),box-shadow .28s ease,background .25s ease}
    #${BUTTON_ID}:hover{transform:translateY(-2px);background:#274f47;box-shadow:0 12px 24px rgba(49,95,85,.24)}
    #${BUTTON_ID} .xsi-seal{display:grid;place-items:center;width:20px;height:20px;border:1px solid rgba(255,255,255,.62);border-radius:4px;font-size:11px}
    .xsi-overlay{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:22px;background:rgba(15,20,18,.46);backdrop-filter:blur(7px);animation:xsiFade .2s ease}
    .xsi-modal{width:min(900px,100%);max-height:min(88vh,860px);overflow:auto;border:1px solid rgba(35,52,47,.14);border-radius:16px;background:#f7f4ec;color:#1d2825;box-shadow:0 28px 80px rgba(22,30,27,.26);animation:xsiRise .38s cubic-bezier(.22,1,.36,1)}
    .dark .xsi-modal{border-color:rgba(222,229,219,.12);background:#171c1a;color:#eee9df}
    .xsi-head{position:sticky;top:0;z-index:2;display:flex;align-items:flex-start;justify-content:space-between;padding:22px 24px 18px;border-bottom:1px solid rgba(35,52,47,.12);background:inherit}
    .dark .xsi-head{border-color:rgba(222,229,219,.1)}
    .xsi-eyebrow{margin-bottom:7px;color:#8f4b3f;font-size:10px;font-weight:700;letter-spacing:.18em}
    .dark .xsi-eyebrow{color:#cf7b6d}
    .xsi-head h2{margin:0;font-size:22px;letter-spacing:-.02em}.xsi-head p{margin:7px 0 0;color:#6b756f;font-size:13px}.dark .xsi-head p{color:#9fa9a2}
    .xsi-close{display:grid;place-items:center;width:34px;height:34px;border:0;border-radius:8px;background:transparent;color:inherit;font-size:23px;cursor:pointer;transition:background .2s ease,transform .25s ease}.xsi-close:hover{background:rgba(49,95,85,.1);transform:rotate(5deg)}
    .xsi-body{padding:22px 24px 26px}.xsi-note{margin-bottom:20px;padding:13px 15px;border-left:3px solid #315f55;background:rgba(49,95,85,.075);color:#53605a;font-size:12px;line-height:1.7}.dark .xsi-note{color:#aab4ae;background:rgba(120,169,154,.09)}
    .xsi-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.xsi-field-wide{grid-column:1/-1}.xsi-label{display:block;margin-bottom:8px;font-size:12px;font-weight:650}.xsi-required{color:#a45143}
    .xsi-input,.xsi-textarea{box-sizing:border-box;width:100%;border:1px solid rgba(35,52,47,.2);border-radius:8px;background:rgba(255,255,255,.62);color:inherit;font:13px/1.55 ui-sans-serif,system-ui;outline:none;transition:border-color .2s ease,box-shadow .25s ease,background .25s ease}.xsi-input{height:40px;padding:0 12px}.xsi-textarea{min-height:190px;resize:vertical;padding:12px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}.dark .xsi-input,.dark .xsi-textarea{border-color:rgba(222,229,219,.16);background:rgba(255,255,255,.04)}.xsi-input:focus,.xsi-textarea:focus{border-color:#315f55;box-shadow:0 0 0 3px rgba(49,95,85,.1)}
    .xsi-help{margin-top:6px;color:#8b958f;font-size:11px;line-height:1.55}.xsi-groups{display:flex;flex-wrap:wrap;gap:8px;min-height:40px}.xsi-group{display:inline-flex;align-items:center;gap:7px;padding:8px 10px;border:1px solid rgba(35,52,47,.15);border-radius:999px;background:rgba(255,255,255,.4);font-size:12px;cursor:pointer}.dark .xsi-group{border-color:rgba(222,229,219,.13);background:rgba(255,255,255,.03)}.xsi-group:has(input:checked){border-color:#315f55;background:rgba(49,95,85,.11);color:#315f55}.dark .xsi-group:has(input:checked){border-color:#78a99a;color:#91bcaf}.xsi-group input{accent-color:#315f55}
    .xsi-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:20px}.xsi-btn{height:40px;padding:0 16px;border:1px solid rgba(35,52,47,.2);border-radius:8px;background:transparent;color:inherit;font-weight:650;cursor:pointer;transition:transform .25s ease,background .25s ease,border-color .25s ease}.xsi-btn:hover{transform:translateY(-1px);border-color:#315f55}.xsi-btn-primary{border-color:#315f55;background:#315f55;color:#fff;box-shadow:0 8px 20px rgba(49,95,85,.17)}.xsi-btn-primary:hover{background:#274f47}.xsi-btn:disabled{cursor:wait;opacity:.55;transform:none}
    .xsi-result{display:none;margin-top:16px;padding:11px 13px;border-radius:8px;font-size:12px}.xsi-result.ok{display:block;background:rgba(49,95,85,.1);color:#315f55}.xsi-result.error{display:block;background:rgba(164,81,67,.1);color:#a45143}.dark .xsi-result.ok{color:#91bcaf}.dark .xsi-result.error{color:#df8c7d}
    .xsi-divider{height:1px;margin:26px 0 20px;background:rgba(35,52,47,.12)}.dark .xsi-divider{background:rgba(222,229,219,.1)}
    .xsi-list-head{display:flex;align-items:end;justify-content:space-between;margin-bottom:12px}.xsi-list-head h3{margin:0;font-size:15px}.xsi-count{color:#8b958f;font-size:11px}.xsi-list{border-top:1px solid rgba(35,52,47,.12)}.dark .xsi-list{border-color:rgba(222,229,219,.1)}.xsi-row{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(150px,.75fr) auto;align-items:center;gap:14px;padding:13px 2px;border-bottom:1px solid rgba(35,52,47,.1)}.dark .xsi-row{border-color:rgba(222,229,219,.08)}.xsi-name{font-size:13px;font-weight:650}.xsi-meta{margin-top:4px;color:#8b958f;font-size:10px}.xsi-badge{display:inline-flex;margin-left:7px;padding:2px 6px;border:1px solid #a45143;border-radius:4px;color:#a45143;font-size:9px;vertical-align:1px}.dark .xsi-badge{border-color:#cf7b6d;color:#cf7b6d}.xsi-groups-text{color:#65716c;font-size:11px}.dark .xsi-groups-text{color:#9fa9a2}.xsi-row-actions{display:flex;align-items:center;gap:8px}.xsi-toggle,.xsi-delete{border:0;background:transparent;color:#65716c;font-size:11px;cursor:pointer}.dark .xsi-toggle,.dark .xsi-delete{color:#a3ada6}.xsi-toggle:hover{color:#315f55}.xsi-delete:hover{color:#a45143}.xsi-empty{padding:28px 0;color:#8b958f;font-size:12px;text-align:center}
    @keyframes xsiFade{from{opacity:0}to{opacity:1}}@keyframes xsiRise{from{opacity:0;transform:translateY(18px) scale(.985)}to{opacity:1;transform:none}}
    @media(max-width:680px){.xsi-overlay{padding:0}.xsi-modal{width:100%;height:100%;max-height:none;border:0;border-radius:0}.xsi-grid{grid-template-columns:1fr}.xsi-field-wide{grid-column:auto}.xsi-row{grid-template-columns:1fr auto}.xsi-groups-text{grid-column:1/-1;grid-row:2}.xsi-body,.xsi-head{padding-left:17px;padding-right:17px}}
  `;

  const routeMatches = () => location.pathname.includes('/server/manage') || location.hash.includes('/server/manage');

  function apiRoot() {
    const base = (window.settings?.base_url || '/').replace(/\/$/, '');
    const secure = String(window.settings?.secure_path || '').replace(/^\/+|\/+$/g, '');
    return `${base}/api/v2/${secure}`;
  }

  function token() {
    try { return JSON.parse(localStorage.getItem('XBOARD_ACCESS_TOKEN') || '{}').value || ''; }
    catch { return ''; }
  }

  async function api(path, options = {}) {
    const response = await fetch(apiRoot() + path, {
      ...options,
      headers: { 'Content-Type': 'application/json', 'Content-Language': localStorage.getItem('i18nextLng') || 'zh-CN', Authorization: token(), ...(options.headers || {}) },
    });
    let body;
    try { body = await response.json(); } catch { body = {}; }
    if (!response.ok || body.status === 'fail') {
      const validation = body.errors ? Object.values(body.errors).flat().join('；') : '';
      throw new Error(validation || body.message || `请求失败（HTTP ${response.status}）`);
    }
    return body.data;
  }

  function ensureStyles() {
    if (document.getElementById('xsi-styles')) return;
    const style = document.createElement('style'); style.id = 'xsi-styles'; style.textContent = styles; document.head.appendChild(style);
  }

  function createTrigger() {
    if (!routeMatches() || document.getElementById(BUTTON_ID)) return;
    const title = [...document.querySelectorAll('h1,h2')].find(el => /节点管理|Node Management/i.test(el.textContent || ''));
    if (!title) return;
    const button = document.createElement('button');
    button.id = BUTTON_ID; button.type = 'button';
    button.innerHTML = '<span class="xsi-seal">特</span><span data-label>一键导入特殊节点</span>';
    button.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); openModal(); });
    const header = title.parentElement?.parentElement;
    if (header) { header.style.display = 'flex'; header.style.alignItems = 'center'; header.style.justifyContent = 'space-between'; header.appendChild(button); }
    else title.insertAdjacentElement('afterend', button);
    updateTriggerCount();
  }

  async function updateTriggerCount() {
    const label = document.querySelector(`#${BUTTON_ID} [data-label]`); if (!label) return;
    try {
      const nodes = await api('/server/manage/getSpecialNodes');
      label.textContent = nodes.length ? `特殊节点 ${nodes.length} · 一键导入` : '一键导入特殊节点';
    } catch {}
  }

  async function openModal() {
    if (document.getElementById(MODAL_ID)) return;
    ensureStyles();
    const overlay = document.createElement('div'); overlay.id = MODAL_ID; overlay.className = 'xsi-overlay';
    overlay.innerHTML = `
      <section class="xsi-modal" role="dialog" aria-modal="true" aria-labelledby="xsi-title">
        <header class="xsi-head"><div><div class="xsi-eyebrow">SPECIAL NODE · DIRECT DELIVERY</div><h2 id="xsi-title">一键导入特殊节点</h2><p>解析外部节点后静态保存，并直接合并到对应用户组的 Clash Meta 订阅。</p></div><button class="xsi-close" type="button" aria-label="关闭">×</button></header>
        <div class="xsi-body">
          <div class="xsi-note">特殊节点不会连接 Xboard Node，也不参与心跳、流量倍率、服务端配置生成或用户同步。系统只保存已解析的客户端配置，并按身份组原样下发。</div>
          <form id="xsi-form"><div class="xsi-grid">
            <div class="xsi-field-wide"><label class="xsi-label">订阅地址或节点内容 <span class="xsi-required">*</span></label><textarea class="xsi-textarea" name="source" required placeholder="支持：订阅地址、Clash Meta YAML、Base64 订阅，以及面板支持协议的分享链接（SS / VMess / VLESS / Trojan / Hysteria / TUIC / AnyTLS / SOCKS / HTTP / Naive / Mieru Simple）"></textarea><div class="xsi-help">远程地址会在服务端安全拉取并立即解析，不保存含 Token 的完整订阅 URL。</div></div>
            <div><label class="xsi-label">下发身份组 <span class="xsi-required">*</span></label><div class="xsi-groups" id="xsi-groups"><span class="xsi-help">正在读取身份组…</span></div></div>
            <div><label class="xsi-label" for="xsi-tags">节点标签</label><input class="xsi-input" id="xsi-tags" name="tags" placeholder="例如：外部线路, 临时资源"><div class="xsi-help">多个标签使用英文或中文逗号分隔。</div></div>
          </div><div class="xsi-result" id="xsi-result"></div><div class="xsi-actions"><button class="xsi-btn" type="button" data-close>取消</button><button class="xsi-btn xsi-btn-primary" type="submit">解析、导入并下发</button></div></form>
          <div class="xsi-divider"></div><div class="xsi-list-head"><h3>已导入的特殊节点</h3><span class="xsi-count" id="xsi-count">读取中…</span></div><div class="xsi-list" id="xsi-list"><div class="xsi-empty">正在加载…</div></div>
        </div>
      </section>`;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    overlay.querySelector('.xsi-close').addEventListener('click', close); overlay.querySelector('[data-close]').addEventListener('click', close);
    overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
    document.addEventListener('keydown', function esc(event) { if (event.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
    overlay.querySelector('#xsi-form').addEventListener('submit', submitImport);
    await Promise.all([loadGroups(), loadNodes()]);
  }

  async function loadGroups() {
    const target = document.getElementById('xsi-groups'); if (!target) return;
    try {
      const groups = await api('/server/group/fetch');
      target.innerHTML = (groups || []).map(group => `<label class="xsi-group"><input type="checkbox" name="group_ids" value="${Number(group.id)}"><span>${escapeHtml(group.name)}</span></label>`).join('') || '<span class="xsi-help">请先创建身份组。</span>';
    } catch (error) { target.innerHTML = `<span class="xsi-help">${escapeHtml(error.message)}</span>`; }
  }

  async function loadNodes() {
    const list = document.getElementById('xsi-list'); const count = document.getElementById('xsi-count'); if (!list || !count) return;
    try {
      const nodes = await api('/server/manage/getSpecialNodes');
      count.textContent = `${nodes.length} 个特殊节点`;
      list.innerHTML = nodes.length ? nodes.map(node => `<div class="xsi-row" data-id="${Number(node.id)}"><div><div class="xsi-name">${escapeHtml(node.name)}<span class="xsi-badge">特殊节点</span></div><div class="xsi-meta">${escapeHtml(String(node.type).toUpperCase())}${node.source_label ? ` · 来源 ${escapeHtml(node.source_label)}` : ''}</div></div><div class="xsi-groups-text">${(node.groups || []).map(group => escapeHtml(group.name)).join('、') || '未分组'}</div><div class="xsi-row-actions"><button class="xsi-toggle" type="button" data-visible="${node.show ? '1' : '0'}">${node.show ? '正在下发' : '已暂停'}</button><button class="xsi-delete" type="button">删除</button></div></div>`).join('') : '<div class="xsi-empty">尚未导入特殊节点。</div>';
      list.querySelectorAll('.xsi-toggle').forEach(button => button.addEventListener('click', toggleNode));
      list.querySelectorAll('.xsi-delete').forEach(button => button.addEventListener('click', deleteNode));
      updateTriggerCount();
    } catch (error) { count.textContent = '读取失败'; list.innerHTML = `<div class="xsi-empty">${escapeHtml(error.message)}</div>`; }
  }

  async function submitImport(event) {
    event.preventDefault(); const form = event.currentTarget; const submit = form.querySelector('[type=submit]'); const result = document.getElementById('xsi-result');
    const source = form.elements.source.value.trim(); const groupIds = [...form.querySelectorAll('input[name=group_ids]:checked')].map(input => Number(input.value)); const tags = form.elements.tags.value.split(/[,，]/).map(value => value.trim()).filter(Boolean);
    if (!source || groupIds.length === 0) { result.className = 'xsi-result error'; result.textContent = !source ? '请粘贴订阅地址或节点内容。' : '请至少选择一个下发身份组。'; return; }
    submit.disabled = true; submit.textContent = '正在解析并导入…'; result.className = 'xsi-result';
    try {
      const data = await api('/server/manage/importSpecial', { method: 'POST', body: JSON.stringify({ source, group_ids: groupIds, tags, show: true }) });
      result.className = 'xsi-result ok'; result.textContent = `成功导入 ${data.count} 个特殊节点，已开始向所选身份组下发。`; form.elements.source.value = ''; await loadNodes();
    } catch (error) { result.className = 'xsi-result error'; result.textContent = error.message; }
    finally { submit.disabled = false; submit.textContent = '解析、导入并下发'; }
  }

  async function toggleNode(event) {
    const row = event.currentTarget.closest('[data-id]'); const show = event.currentTarget.dataset.visible !== '1'; event.currentTarget.disabled = true;
    try { await api('/server/manage/updateSpecial', { method: 'POST', body: JSON.stringify({ id: Number(row.dataset.id), show }) }); await loadNodes(); }
    catch (error) { alert(error.message); }
  }

  async function deleteNode(event) {
    const row = event.currentTarget.closest('[data-id]'); if (!confirm('确定删除这个特殊节点吗？删除后将立即停止下发。')) return; event.currentTarget.disabled = true;
    try { await api('/server/manage/dropSpecial', { method: 'POST', body: JSON.stringify({ id: Number(row.dataset.id) }) }); await loadNodes(); }
    catch (error) { alert(error.message); }
  }

  function escapeHtml(value) { return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]); }

  ensureStyles();
  new MutationObserver(createTrigger).observe(document.documentElement, { childList: true, subtree: true });
  addEventListener('popstate', () => setTimeout(createTrigger));
  setInterval(createTrigger, 1000);
  createTrigger();
})();
