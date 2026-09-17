(() => {
  const STYLE_ID = 'xnd-styles';

  const styles = `
  .xnd-overlay{position:fixed;inset:0;z-index:80;display:flex;align-items:flex-start;justify-content:center;padding:6vh 16px 32px;background:hsl(var(--foreground)/.42);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);animation:xnd-fade .16s ease}
  /* In dark mode --foreground is near-white, so the scrim has to come from the
     background token instead of washing the page out. */
  .dark .xnd-overlay{background:hsl(var(--background)/.78)}
  @keyframes xnd-fade{from{opacity:0}to{opacity:1}}
  @keyframes xnd-pop{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}
  .xnd-dialog{width:min(620px,100%);max-height:88vh;overflow:auto;border:1px solid hsl(var(--border));border-radius:calc(var(--radius) + 4px);background:hsl(var(--background));color:hsl(var(--foreground));box-shadow:0 24px 70px hsl(var(--foreground)/.22);animation:xnd-pop .22s cubic-bezier(.22,1,.36,1)}
  .xnd-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:20px 22px 16px;border-bottom:1px solid hsl(var(--border))}
  .xnd-title{font-size:15px;font-weight:600;letter-spacing:-.01em}
  .xnd-sub{margin-top:6px;font-size:12px;line-height:1.6;color:hsl(var(--muted-foreground))}
  .xnd-close{display:grid;place-items:center;width:30px;height:30px;flex:none;border:1px solid transparent;border-radius:calc(var(--radius) - 2px);background:transparent;color:hsl(var(--muted-foreground));font-size:18px;line-height:1;cursor:pointer;transition:background .15s ease,color .15s ease}
  .xnd-close:hover{background:hsl(var(--accent));color:hsl(var(--accent-foreground))}
  .xnd-body{display:flex;flex-direction:column;gap:18px;padding:20px 22px}
  .xnd-field{display:flex;flex-direction:column;gap:8px}
  .xnd-label{font-size:12px;font-weight:600;letter-spacing:.02em;color:hsl(var(--foreground)/.85)}
  .xnd-label span{color:hsl(var(--destructive))}
  .xnd-hint{font-size:11px;line-height:1.6;color:hsl(var(--muted-foreground))}
  .xnd-input,.xnd-textarea{box-sizing:border-box;width:100%;border:1px solid hsl(var(--border));border-radius:calc(var(--radius) - 2px);background:hsl(var(--background));color:inherit;font:12px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;outline:none;transition:border-color .15s ease,box-shadow .15s ease}
  .xnd-input{height:36px;padding:0 11px}
  .xnd-textarea{min-height:150px;padding:11px;resize:vertical}
  .xnd-input:focus,.xnd-textarea:focus{border-color:hsl(var(--ring,var(--primary)));box-shadow:0 0 0 3px hsl(var(--primary)/.12)}
  .xnd-pills{display:flex;flex-wrap:wrap;gap:7px}
  .xnd-pill{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border:1px solid hsl(var(--border));border-radius:999px;background:hsl(var(--muted)/.5);font-size:12px;cursor:pointer;user-select:none;transition:border-color .15s ease,background .15s ease,color .15s ease}
  .xnd-pill:hover{border-color:hsl(var(--primary)/.45)}
  .xnd-pill input{margin:0;accent-color:hsl(var(--primary));display:none}
  .xnd-pill[data-on="1"]{border-color:hsl(var(--primary));background:hsl(var(--primary));color:hsl(var(--primary-foreground))}
  .xnd-chips{display:flex;flex-wrap:wrap;gap:7px}
  .xnd-chip{display:inline-flex;align-items:center;gap:6px;padding:5px 8px 5px 10px;border:1px solid hsl(var(--primary)/.4);border-radius:999px;background:hsl(var(--primary)/.08);font-size:12px}
  .xnd-chip b{font-weight:600}
  .xnd-chip button{border:0;background:transparent;color:inherit;font-size:14px;line-height:1;cursor:pointer;opacity:.55}
  .xnd-chip button:hover{opacity:1}
  .xnd-results{max-height:190px;overflow:auto;border:1px solid hsl(var(--border));border-radius:calc(var(--radius) - 2px);background:hsl(var(--popover))}
  .xnd-result{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 11px;font-size:12px;cursor:pointer}
  .xnd-result+.xnd-result{border-top:1px solid hsl(var(--border))}
  .xnd-result:hover{background:hsl(var(--accent));color:hsl(var(--accent-foreground))}
  .xnd-result small{color:hsl(var(--muted-foreground))}
  .xnd-empty{padding:11px;font-size:12px;color:hsl(var(--muted-foreground))}
  .xnd-switch{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 14px;border:1px solid hsl(var(--border));border-radius:calc(var(--radius) - 2px);background:hsl(var(--muted)/.35)}
  .xnd-switch-text b{display:block;font-size:12px;font-weight:600}
  .xnd-switch-text small{font-size:11px;color:hsl(var(--muted-foreground))}
  .xnd-switch input{width:38px;height:20px;flex:none;margin:0;accent-color:hsl(var(--primary));cursor:pointer}
  .xnd-meta{display:grid;gap:8px;padding:12px 14px;border:1px dashed hsl(var(--border));border-radius:calc(var(--radius) - 2px);font-size:11px;color:hsl(var(--muted-foreground))}
  .xnd-meta code{color:hsl(var(--foreground)/.8);font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
  .xnd-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 22px 20px;border-top:1px solid hsl(var(--border))}
  .xnd-actions{display:flex;gap:9px}
  .xnd-btn{height:36px;padding:0 15px;border:1px solid hsl(var(--border));border-radius:calc(var(--radius) - 2px);background:hsl(var(--background));color:hsl(var(--foreground));font-size:12px;font-weight:600;cursor:pointer;transition:background .15s ease,border-color .15s ease,opacity .15s ease}
  .xnd-btn:hover{background:hsl(var(--accent));color:hsl(var(--accent-foreground))}
  .xnd-btn-primary{border-color:hsl(var(--primary));background:hsl(var(--primary));color:hsl(var(--primary-foreground))}
  .xnd-btn-primary:hover{background:hsl(var(--primary)/.9);color:hsl(var(--primary-foreground))}
  .xnd-btn-danger{border-color:hsl(var(--destructive));background:hsl(var(--destructive));color:#fff}
  .xnd-btn-danger:hover{background:hsl(var(--destructive)/.9);color:#fff}
  .xnd-btn[disabled]{cursor:not-allowed;opacity:.6}
  .xnd-msg{font-size:11px;line-height:1.6;color:hsl(var(--muted-foreground))}
  .xnd-msg[data-tone="error"]{color:hsl(var(--destructive))}
  .xnd-toast-wrap{position:fixed;left:50%;bottom:28px;z-index:90;display:flex;flex-direction:column;gap:8px;transform:translateX(-50%);pointer-events:none}
  .xnd-toast{padding:10px 16px;border:1px solid hsl(var(--border));border-radius:999px;background:hsl(var(--popover));color:hsl(var(--popover-foreground));font-size:12px;box-shadow:0 12px 32px hsl(var(--foreground)/.18);animation:xnd-pop .2s ease}
  .xnd-toast[data-tone="error"]{border-color:hsl(var(--destructive)/.5);color:hsl(var(--destructive))}
  @media (max-width:640px){.xnd-overlay{padding:14px}.xnd-dialog{max-height:92vh}}
  `;

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = styles;
    document.head.appendChild(style);
  }

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

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
  }

  function shortName(email) {
    const value = String(email || '').trim();
    if (!value) return '';
    return value.includes('@') ? value.split('@')[0] : value;
  }

  function toast(message, tone = 'ok') {
    ensureStyles();
    let wrap = document.querySelector('.xnd-toast-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'xnd-toast-wrap';
      document.body.appendChild(wrap);
    }
    const item = document.createElement('div');
    item.className = 'xnd-toast';
    item.dataset.tone = tone;
    item.textContent = message;
    wrap.appendChild(item);
    setTimeout(() => item.remove(), 3200);
  }

  let groupsCache = null;

  async function loadGroups(refresh = false) {
    if (groupsCache && !refresh) return groupsCache;
    groupsCache = (await api('/server/group/fetch')) || [];
    return groupsCache;
  }

  let userSearchToken = 0;

  async function searchUsers(keyword) {
    const current = ++userSearchToken;
    const users = (await api('/server/manage/searchUsers?keyword=' + encodeURIComponent(keyword || ''))) || [];
    return current === userSearchToken ? users : [];
  }

  function mount({ title, subtitle, body, footer, width }) {
    ensureStyles();
    const overlay = document.createElement('div');
    overlay.className = 'xnd-overlay';
    overlay.innerHTML = `
      <section class="xnd-dialog" role="dialog" aria-modal="true" ${width ? `style="width:min(${width},100%)"` : ''}>
        <header class="xnd-head">
          <div>
            <div class="xnd-title">${escapeHtml(title)}</div>
            ${subtitle ? `<div class="xnd-sub">${escapeHtml(subtitle)}</div>` : ''}
          </div>
          <button class="xnd-close" type="button" aria-label="关闭">×</button>
        </header>
        <div class="xnd-body"></div>
        ${footer ? '<div class="xnd-foot"></div>' : ''}
      </section>`;
    const dialog = overlay.querySelector('.xnd-dialog');
    dialog.querySelector('.xnd-body').append(...[].concat(body || []));
    if (footer) dialog.querySelector('.xnd-foot').append(...[].concat(footer));
    document.body.appendChild(overlay);

    const close = () => {
      overlay.remove();
      document.removeEventListener('keydown', onKey);
    };
    const onKey = event => { if (event.key === 'Escape') close(); };
    overlay.querySelector('.xnd-close').addEventListener('click', close);
    overlay.addEventListener('mousedown', event => { if (event.target === overlay) close(); });
    document.addEventListener('keydown', onKey);

    return { overlay, dialog, close };
  }

  function confirmDialog({ title, message, confirmText = '确认删除', onConfirm }) {
    const messageEl = document.createElement('div');
    messageEl.className = 'xnd-hint';
    messageEl.textContent = message;

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.className = 'xnd-btn';
    cancel.textContent = '取消';

    const confirm = document.createElement('button');
    confirm.type = 'button';
    confirm.className = 'xnd-btn xnd-btn-danger';
    confirm.textContent = confirmText;

    const actions = document.createElement('div');
    actions.className = 'xnd-actions';
    actions.append(cancel, confirm);

    const { close } = mount({ title, body: messageEl, footer: actions, width: '420px' });
    cancel.addEventListener('click', close);
    confirm.addEventListener('click', async () => {
      confirm.disabled = true;
      try {
        await onConfirm();
        close();
      } catch (error) {
        confirm.disabled = false;
        toast(error.message, 'error');
      }
    });
  }

  function createGroupPills(selected) {
    const wrapper = document.createElement('div');
    wrapper.className = 'xnd-pills';
    wrapper.dataset.empty = '正在读取身份组…';
    wrapper.textContent = '正在读取身份组…';

    loadGroups().then(groups => {
      wrapper.textContent = '';
      if (!groups.length) {
        wrapper.dataset.empty = '请先在「权限组」里创建身份组。';
        wrapper.textContent = wrapper.dataset.empty;
        return;
      }
      groups.forEach(group => {
        const id = String(group.id);
        const pill = document.createElement('label');
        pill.className = 'xnd-pill';
        pill.dataset.on = selected.has(id) ? '1' : '0';
        pill.innerHTML = `<input type="checkbox" value="${Number(group.id)}" ${selected.has(id) ? 'checked' : ''}><span>${escapeHtml(group.name)}</span>`;
        pill.querySelector('input').addEventListener('change', event => {
          if (event.target.checked) selected.add(id); else selected.delete(id);
          pill.dataset.on = event.target.checked ? '1' : '0';
        });
        wrapper.appendChild(pill);
      });
    }).catch(error => {
      wrapper.dataset.empty = error.message;
      wrapper.textContent = error.message;
    });

    return wrapper;
  }

  function createUserPicker(selected) {
    const field = document.createElement('div');
    field.className = 'xnd-field';
    field.innerHTML = `
      <div class="xnd-label">单独分配给个人</div>
      <div class="xnd-chips"></div>
      <input class="xnd-input" type="search" placeholder="搜索邮箱添加，可留空">
      <div class="xnd-results" hidden></div>
      <div class="xnd-hint">被单独分配的用户无论属于哪个身份组都能看到这个节点。</div>`;

    const chips = field.querySelector('.xnd-chips');
    const input = field.querySelector('input');
    const results = field.querySelector('.xnd-results');

    const renderChips = () => {
      chips.textContent = '';
      if (!selected.size) {
        const empty = document.createElement('span');
        empty.className = 'xnd-hint';
        empty.textContent = '未单独分配';
        chips.appendChild(empty);
        return;
      }
      selected.forEach(item => {
        const chip = document.createElement('span');
        chip.className = 'xnd-chip';
        chip.innerHTML = `<b>${escapeHtml(shortName(item.email))}</b><button type="button" aria-label="移除">×</button>`;
        chip.querySelector('button').addEventListener('click', () => {
          selected.delete(item.id);
          renderChips();
        });
        chips.appendChild(chip);
      });
    };

    const hideResults = () => { results.hidden = true; results.textContent = ''; };

    const showResults = users => {
      results.textContent = '';
      if (!users.length) {
        results.hidden = false;
        results.innerHTML = '<div class="xnd-empty">没有匹配的用户</div>';
        return;
      }
      users.forEach(user => {
        const row = document.createElement('div');
        row.className = 'xnd-result';
        row.innerHTML = `<span>${escapeHtml(user.email)}</span><small>${escapeHtml(user.group_name || '未分组')}</small>`;
        row.addEventListener('click', () => {
          selected.set(String(user.id), { id: String(user.id), email: user.email });
          input.value = '';
          hideResults();
          renderChips();
        });
        results.appendChild(row);
      });
      results.hidden = false;
    };

    let timer = null;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      const keyword = input.value.trim();
      timer = setTimeout(async () => {
        try { showResults(await searchUsers(keyword)); }
        catch (error) { results.hidden = false; results.innerHTML = `<div class="xnd-empty">${escapeHtml(error.message)}</div>`; }
      }, 240);
    });
    input.addEventListener('focus', () => {
      if (!input.value.trim()) {
        searchUsers('').then(showResults).catch(() => {});
      }
    });
    input.addEventListener('blur', () => setTimeout(hideResults, 180));

    renderChips();

    return { field, selected };
  }

  function collectUserIds(selected) {
    return [...selected.values()].map(item => Number(item.id));
  }

  function openImportDialog(refetch) {
    const groups = new Set();
    const users = new Map();
    const userPicker = createUserPicker(users);

    const source = document.createElement('textarea');
    source.className = 'xnd-textarea';
    source.placeholder = '粘贴订阅地址、Clash Meta YAML / JSON、Base64 订阅，或节点分享链接';

    const sourceField = document.createElement('div');
    sourceField.className = 'xnd-field';
    sourceField.innerHTML = '<div class="xnd-label">节点内容 <span>*</span></div>';
    sourceField.append(source, Object.assign(document.createElement('div'), {
      className: 'xnd-hint',
      textContent: '支持 SS / VMess / VLESS / Trojan / Hysteria / TUIC / AnyTLS / SOCKS / HTTP / Naive / Mieru 等分享链接与订阅格式。导入后只在订阅里原样下发，不会连接 Xboard Node。',
    }));

    const tags = document.createElement('input');
    tags.className = 'xnd-input';
    tags.placeholder = '例如：外部线路, 临时资源（可留空）';
    const tagsField = document.createElement('div');
    tagsField.className = 'xnd-field';
    tagsField.innerHTML = '<div class="xnd-label">节点标签</div>';
    tagsField.append(tags);

    const groupField = document.createElement('div');
    groupField.className = 'xnd-field';
    groupField.innerHTML = '<div class="xnd-label">下发给身份组</div>';
    groupField.append(createGroupPills(groups));

    const show = document.createElement('input');
    show.type = 'checkbox';
    show.checked = true;
    const switchRow = document.createElement('label');
    switchRow.className = 'xnd-switch';
    switchRow.innerHTML = '<span class="xnd-switch-text"><b>导入后立即下发</b><small>关闭后节点会先保存，但用户订阅里看不到。</small></span>';
    switchRow.appendChild(show);

    const message = document.createElement('div');
    message.className = 'xnd-msg';

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.className = 'xnd-btn';
    cancel.textContent = '取消';

    const submit = document.createElement('button');
    submit.type = 'button';
    submit.className = 'xnd-btn xnd-btn-primary';
    submit.textContent = '解析并导入';

    const actions = document.createElement('div');
    actions.className = 'xnd-actions';
    actions.append(cancel, submit);

    const footer = document.createElement('div');
    footer.append(message, actions);

    const { close } = mount({
      title: '导入外部节点',
      subtitle: '外部节点不依赖 Xboard Node，解析完成后直接合并进所选身份组或用户的订阅。',
      body: [sourceField, groupField, userPicker.field, tagsField, switchRow],
      footer,
    });

    cancel.addEventListener('click', close);
    submit.addEventListener('click', async () => {
      const value = source.value.trim();
      const groupIds = [...groups].map(Number);
      const userIds = collectUserIds(users);
      if (!value) { message.dataset.tone = 'error'; message.textContent = '请粘贴订阅地址或节点内容。'; return; }
      if (!groupIds.length && !userIds.length) { message.dataset.tone = 'error'; message.textContent = '请至少选择一个身份组或一名用户。'; return; }

      submit.disabled = true;
      message.dataset.tone = '';
      message.textContent = '正在解析，请稍候…';
      try {
        const data = await api('/server/manage/importSpecial', {
          method: 'POST',
          body: JSON.stringify({
            source: value,
            group_ids: groupIds,
            user_ids: userIds,
            tags: tags.value.split(/[,，]/).map(item => item.trim()).filter(Boolean),
            show: show.checked,
          }),
        });
        toast(`已导入 ${data?.count ?? 0} 个外部节点`);
        close();
        if (typeof refetch === 'function') refetch();
      } catch (error) {
        submit.disabled = false;
        message.dataset.tone = 'error';
        message.textContent = error.message;
      }
    });
  }

  function openSpecialEditor(node, refetch) {
    const groups = new Set((node.group_ids || []).map(String));
    const users = new Map((node.users || []).map(user => [String(user.id), { id: String(user.id), email: user.email }]));
    const userPicker = createUserPicker(users);

    const name = document.createElement('input');
    name.className = 'xnd-input';
    name.value = node.name || '';
    const nameField = document.createElement('div');
    nameField.className = 'xnd-field';
    nameField.innerHTML = '<div class="xnd-label">节点名称 <span>*</span></div>';
    nameField.append(name);

    const tags = document.createElement('input');
    tags.className = 'xnd-input';
    tags.value = (node.tags || []).join(', ');
    const tagsField = document.createElement('div');
    tagsField.className = 'xnd-field';
    tagsField.innerHTML = '<div class="xnd-label">节点标签</div>';
    tagsField.append(tags);

    const groupField = document.createElement('div');
    groupField.className = 'xnd-field';
    groupField.innerHTML = '<div class="xnd-label">下发给身份组</div>';
    groupField.append(createGroupPills(groups));

    const show = document.createElement('input');
    show.type = 'checkbox';
    show.checked = Boolean(node.show);
    const switchRow = document.createElement('label');
    switchRow.className = 'xnd-switch';
    switchRow.innerHTML = '<span class="xnd-switch-text"><b>下发到订阅</b><small>关闭后该节点仍保留在列表里，但不会出现在订阅中。</small></span>';
    switchRow.appendChild(show);

    const meta = document.createElement('div');
    meta.className = 'xnd-meta';
    meta.innerHTML = `<div>协议：<code>${escapeHtml(String(node.type || '').toUpperCase())}</code> · 地址：<code>${escapeHtml(node.host || '-')}:${escapeHtml(node.port || '-')}</code></div>`
      + `<div>来源：<code>${escapeHtml(node.source_label || '手动导入')}</code> · 类型：<code>外部节点</code></div>`;

    const message = document.createElement('div');
    message.className = 'xnd-msg';

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.className = 'xnd-btn';
    cancel.textContent = '取消';

    const submit = document.createElement('button');
    submit.type = 'button';
    submit.className = 'xnd-btn xnd-btn-primary';
    submit.textContent = '保存';

    const actions = document.createElement('div');
    actions.className = 'xnd-actions';
    actions.append(cancel, submit);

    const footer = document.createElement('div');
    footer.append(message, actions);

    const { close } = mount({
      title: '编辑外部节点',
      subtitle: '这里只调整名称、标签与下发范围，节点本身的配置保持原样。',
      body: [nameField, groupField, userPicker.field, tagsField, switchRow, meta],
      footer,
    });

    cancel.addEventListener('click', close);
    submit.addEventListener('click', async () => {
      const value = name.value.trim();
      const groupIds = [...groups].map(Number);
      const userIds = collectUserIds(users);
      if (!value) { message.dataset.tone = 'error'; message.textContent = '请输入节点名称。'; return; }
      if (!groupIds.length && !userIds.length) { message.dataset.tone = 'error'; message.textContent = '请至少保留一个身份组或一名用户。'; return; }

      submit.disabled = true;
      message.dataset.tone = '';
      message.textContent = '正在保存…';
      try {
        await api('/server/manage/updateSpecial', {
          method: 'POST',
          body: JSON.stringify({
            id: Number(node.special_id),
            name: value,
            group_ids: groupIds,
            user_ids: userIds,
            tags: tags.value.split(/[,，]/).map(item => item.trim()).filter(Boolean),
            show: show.checked,
          }),
        });
        toast('外部节点已更新');
        close();
        if (typeof refetch === 'function') refetch();
      } catch (error) {
        submit.disabled = false;
        message.dataset.tone = 'error';
        message.textContent = error.message;
      }
    });
  }

  function openAssignDialog(node, refetch) {
    const users = new Map((node.users || []).map(user => [String(user.id), { id: String(user.id), email: user.email }]));
    const userPicker = createUserPicker(users);

    const meta = document.createElement('div');
    meta.className = 'xnd-meta';
    meta.innerHTML = `<div>节点：<code>${escapeHtml(node.name || '')}</code> · ${escapeHtml(String(node.type || '').toUpperCase())}</div>`
      + `<div>身份组：<code>${escapeHtml((node.groups || []).map(group => group.name).join('、') || '未绑定身份组')}</code></div>`;

    const message = document.createElement('div');
    message.className = 'xnd-msg';

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.className = 'xnd-btn';
    cancel.textContent = '取消';

    const submit = document.createElement('button');
    submit.type = 'button';
    submit.className = 'xnd-btn xnd-btn-primary';
    submit.textContent = '保存分配';

    const actions = document.createElement('div');
    actions.className = 'xnd-actions';
    actions.append(cancel, submit);

    const footer = document.createElement('div');
    footer.append(message, actions);

    const { close } = mount({
      title: '分配给个人',
      subtitle: '除了身份组，也可以只把节点开放给指定的几个人。',
      body: [meta, userPicker.field],
      footer,
    });

    cancel.addEventListener('click', close);
    submit.addEventListener('click', async () => {
      const userIds = collectUserIds(users);
      submit.disabled = true;
      message.dataset.tone = '';
      message.textContent = '正在保存…';
      try {
        if (node.is_special) {
          await api('/server/manage/updateSpecial', {
            method: 'POST',
            body: JSON.stringify({ id: Number(node.special_id), user_ids: userIds }),
          });
        } else {
          await api('/server/manage/update', {
            method: 'POST',
            body: JSON.stringify({ id: Number(node.id), user_ids: userIds }),
          });
        }
        toast(userIds.length ? '已更新个人分配' : '已清空个人分配');
        close();
        if (typeof refetch === 'function') refetch();
      } catch (error) {
        submit.disabled = false;
        message.dataset.tone = 'error';
        message.textContent = error.message;
      }
    });
  }

  function toggleSpecial(node, nextShow, refetch) {
    api('/server/manage/updateSpecial', {
      method: 'POST',
      body: JSON.stringify({ id: Number(node.special_id), show: nextShow ? 1 : 0 }),
    }).then(() => {
      toast(nextShow ? '已恢复下发' : '已暂停下发');
      if (typeof refetch === 'function') refetch();
    }).catch(error => toast(error.message, 'error'));
  }

  function deleteSpecial(node, refetch) {
    confirmDialog({
      title: '删除外部节点',
      message: `删除「${node.name}」后将立即停止下发，且无法恢复。`,
      onConfirm: async () => {
        await api('/server/manage/dropSpecial', {
          method: 'POST',
          body: JSON.stringify({ id: Number(node.special_id) }),
        });
        toast('外部节点已删除');
        if (typeof refetch === 'function') refetch();
      },
    });
  }

  window.__xboardOpenSpecialImport = openImportDialog;
  window.__xboardNodeDialog = {
    openImport: openImportDialog,
    editSpecial: openSpecialEditor,
    assignUsers: openAssignDialog,
    toggleSpecial,
    deleteSpecial,
    toast,
  };
})();
