// ── Nav highlighting + hamburger + profile-aware nav CTA ─────────────────
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === page) link.classList.add('is-active');
  });

  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('is-open', !expanded);
    });
  }

  const hasProfile = localStorage.getItem('bandsAid_hasProfile') === 'true';
  const navCta = document.querySelector('.nav-cta');
  if (navCta) navCta.textContent = hasProfile ? 'My Profile' : 'Login';
});

// ── Alpine.js app ────────────────────────────────────────────────────────
function bandsAidApp() {
  return {
    // filter state
    roleFilter:       'all',
    genreFilter:      [],
    locationInput:    '',
    preferenceFilter: 'any',
    searchQuery:      '',
    distanceRadius:   50,

    // profile state
    hasProfile: localStorage.getItem('bandsAid_hasProfile') === 'true',

    // overlay state
    overlayOpen:   false,
    overlayMode:   null,
    activeProfile: null,

    // create form state
    createForm: {
      type:              'musician',
      name:              '',
      instruments:       [],
      instrumentOther:   '',
      location:          '',
      genres:            [],
      preference:        'mix',
      inspirations:      '',
      bio:               '',
    },
    createSuccess: false,
    instrumentPickerOpen: false,

    get instrumentPickerLabel() {
      const selected = [...this.createForm.instruments];
      if (this.createForm.instruments.includes('Other') && this.createForm.instrumentOther.trim()) {
        const idx = selected.indexOf('Other');
        selected[idx] = this.createForm.instrumentOther.trim();
      }
      return selected.length === 0 ? 'Select instruments…' : selected.join(', ');
    },

    get allGenres() {
      return GENRES;
    },

    get allInstruments() {
      return INSTRUMENTS;
    },

    get recommendations() {
      return PROFILES.filter(p => p.postedDaysAgo <= 7);
    },

    get filteredProfiles() {
      const q = this.searchQuery.toLowerCase();
      return PROFILES.filter(p => {
        if (p.distanceMiles > this.distanceRadius) return false;
        if (this.roleFilter !== 'all' && p.type !== this.roleFilter) return false;
        if (this.genreFilter.length > 0 && !this.genreFilter.some(g => p.genres.includes(g))) return false;
        if (this.locationInput && !p.location.toLowerCase().includes(this.locationInput.toLowerCase())) return false;
        if (this.preferenceFilter !== 'any') {
          const match = p.preference === this.preferenceFilter || p.preference === 'mix';
          if (!match) return false;
        }
        if (q && !p.name.toLowerCase().includes(q) && !p.bio.toLowerCase().includes(q) && !p.genres.some(g => g.toLowerCase().includes(q))) return false;
        return true;
      });
    },

    openProfile(profile) {
      this.activeProfile = profile;
      this.overlayMode   = 'profile';
      this.overlayOpen   = true;
      document.body.style.overflow = 'hidden';
    },

    openCreate() {
      this.overlayMode = 'create';
      this.overlayOpen = true;
      document.body.style.overflow = 'hidden';
    },

    closeOverlay() {
      this.overlayOpen   = false;
      this.activeProfile = null;
      this.overlayMode   = null;
      this.createSuccess = false;
      document.body.style.overflow = '';
    },

    submitCreate() {
      this.createSuccess = true;
      this.hasProfile = true;
      localStorage.setItem('bandsAid_hasProfile', 'true');
      localStorage.setItem('bandsAid_profileData', JSON.stringify({ ...this.createForm }));
      setTimeout(() => this.closeOverlay(), 2200);
    },

    toggleGenreFilter(genre) {
      const idx = this.genreFilter.indexOf(genre);
      if (idx === -1) this.genreFilter.push(genre);
      else            this.genreFilter.splice(idx, 1);
    },

    clearFilters() {
      this.roleFilter       = 'all';
      this.genreFilter      = [];
      this.locationInput    = '';
      this.preferenceFilter = 'any';
      this.searchQuery      = '';
      this.distanceRadius   = 50;
    },
  };
}

// ── Create / Edit profile page ────────────────────────────────────────────
function createProfileApp() {
  const saved = JSON.parse(localStorage.getItem('bandsAid_profileData') || 'null') || {};
  return {
    type:                saved.type              || 'musician',
    name:                saved.name              || '',
    instruments:         saved.instruments       || [],
    instrumentOther:     saved.instrumentOther   || '',
    instrumentPickerOpen: false,
    location:            saved.location          || '',
    genres:              saved.genres            || [],
    preference:          saved.preference        || 'mix',
    inspirations:        saved.inspirations      || '',
    bio:                 saved.bio               || '',
    submitted:           false,
    hasProfile:          localStorage.getItem('bandsAid_hasProfile') === 'true',
    allGenres:           GENRES,
    allInstruments:      INSTRUMENTS,

    get instrumentPickerLabel() {
      const sel = [...this.instruments];
      if (sel.includes('Other') && this.instrumentOther.trim()) sel[sel.indexOf('Other')] = this.instrumentOther.trim();
      return sel.length === 0 ? 'Select instruments…' : sel.join(', ');
    },

    submit() {
      this.submitted  = true;
      this.hasProfile = true;
      const data = {
        type: this.type, name: this.name,
        instruments: this.instruments, instrumentOther: this.instrumentOther,
        location: this.location, genres: this.genres,
        preference: this.preference, inspirations: this.inspirations,
        bio: this.bio,
      };
      localStorage.setItem('bandsAid_hasProfile', 'true');
      localStorage.setItem('bandsAid_profileData', JSON.stringify(data));
    },
  };
}
