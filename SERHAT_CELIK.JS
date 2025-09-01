(() => {
    const DATA_URL = "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json";
    const TTL_MS = 12 * 60 * 60 * 1000;
    const LS_PRODUCTS = "ebk2_products";
    const LS_TS = "ebk2_products_ts";
    const LS_FAV = "ebk2_favs";

    const EXISTING = document.querySelector("eb-product-carousel");
    const INSERT_HOST = EXISTING?.parentElement || document.body;

    if (!document.getElementById("ebk2-styles")) {
        const css = `
    .ebk2-wrap{box-sizing:border-box;width:100%;margin:0 0 12px 0}
    .ebk2-container{max-width:100%;margin:0 auto;padding:0 16px}
    .ebk2-header{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:12px 0 10px}
    .ebk2-header h2{font-family:Quicksand-SemiBold;font-weight:600;font-size:24px;line-height:28px;color:#1A1C1D;margin:0}
    .ebk2-outer{position:relative}
    .ebk2-row{overflow:hidden}
    .ebk2-track{display:flex;gap:16px;transition:transform .35s ease;will-change:transform;padding:2px 0 10px}
    .ebk2-item{flex:0 0 auto;width:275.5px}
    .ebk2-card{position:relative;border:1px solid #DADCE0;border-radius:12px;background:#fff;padding:10px;box-shadow:0 1px 2px rgba(0,0,0,.04);height:100%}
    .ebk2-img{width:100%;background:#F9F9F9;border-radius:10px;display:grid;place-items:center;overflow:hidden}
    .ebk2-img img{width:100%;height:203px;object-fit:contain}
    .ebk2-name{margin:8px 0 6px;color:#2C2D2E;font-size:13px;line-height:1.35;height:34px;overflow:hidden}
    .ebk2-price{margin-top:6px}
    .ebk2-price .old{color:#9aa0a6;text-decoration:line-through;font-size:12px;white-space:nowrap;margin-right:8px}
    .ebk2-price .now{font-weight:700;font-size:16px;color:#E97F32}
    .ebk2-badge{position:absolute;top:10px;left:10px;z-index:2;background:#ef4444;color:#fff;font-weight:700;font-size:12px;padding:4px 6px;border-radius:8px}
    .ebk2-heart{position:absolute;top:10px;right:10px;z-index:2;width:28px;height:28px;border-radius:999px;background:rgba(255,255,255,.95);border:1px solid #eee;display:grid;place-items:center;cursor:pointer}
    .ebk2-heart svg{width:18px;height:18px}
    .heart{position:absolute;top:10px;right:10px;z-index:9999;width:28px;height:28px;border-radius:999px;background:rgba(255,255,255,.95);border:1px solid #eee;display:grid;place-items:center;cursor:pointer;pointer-events:auto}
    .heart svg{width:18px;height:18px;transition:all 0.2s ease}
    .heart:hover{transform:scale(1.1);background:rgba(255,255,255,1)}
    .heart:active{transform:scale(0.95)}
    .heart .icon-wrapper{position:relative;width:18px;height:18px;display:flex;align-items:center;justify-content:center;pointer-events:none}
    .heart .icon-wrapper span{width:18px;height:18px;display:flex;align-items:center;justify-content:center;font-weight:900 !important;text-shadow: 0 0 1px currentColor;pointer-events:none}
    .heart .toys-icon{font-size:14px !important;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
    .heart .toys-icon-heart-outline{color:#666}
    .heart .toys-icon-heart-orange-outline{color:#FF7A00}
    .heart .toys-icon-heart-orange-outline.hovered{color:#FF7A00 !important; background-color:#FF7A00; -webkit-text-fill-color:#FF7A00; text-shadow: 0 0 0 #FF7A00}
    .heart .toys-icon-heart-orange-outline::before{color:#FF7A00 !important; content:'♥'; font-size:18px}
    .swiper-next, .swiper-prev{position:absolute;bottom:50%;top:auto;transform:translateY(50%);width:40px !important;height:40px !important;border:none;border-radius:999px !important;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.1);z-index:3;transition:all 0.2s ease}
    .swiper-prev{left:-65px}.swiper-next{right:-65px}
    .swiper-next .toys-icon, .swiper-prev .toys-icon{font-size:14px;color:#666p;width: 14px;height: 14px}
    .toys-icon .toys-icon-arrow-right{
    width: 14px;
    height: 14px;
    }
    .ebk2-item .product-item__img.list-view{
    width: 100%;
    margin: 0;
    background:#F9F9F9;
    border-radius:10px;
    overflow:hidden;
    }
    .ebk2-item .product-item__img.list-view img.ebk2-img-fix{
    position: absolute;
    inset: 0;
    width: 100% !important;
    height: 203px !important;
    object-fit: contain;
    }

    .ebk2-wrap eb-product-list-item .product-item .product-item__img.list-view > img.ebk2-img-fix{
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
    max-width: 100% !important;
    max-height: 203px !important;
    object-fit: contain !important;
    }

    .ebk2-wrap .product-item__img.list-view{
    position: relative !important;
    width: 100% !important;
    height: 203px !important;
    margin: 0 !important;
    background:#fff !important;
    border-radius:10px !important;
    overflow:hidden !important;
    }
    .discount{
        background-color: #00a365;
        color: #fff;
        border-radius: 16px;
        padding: 0 4px;
        font-size: 12px;
        font-weight: 600;
        }
    .old-price {
        font-size: 20px;
        line-height: 20px;
        color: var(--Primary-Black);
        margin-right: 8px;
        line-height: normal;
        font-weight: 600;
    }
    .old-price-crossed {
        font-size: 14px;
        line-height: 20px;
        color: #9aa0a6;
        margin-right: 8px;
        font-weight: 400;
    }
    .new-price {
        font-size: 20px;
        line-height: 20px;
        color: #00a365;
        font-weight: 600;
    }
    .ng-star-inserted{
    font-size: 14px;
    }

    @media (min-width: 576px) { .ebk2-container{max-width: 540px} }
    @media (min-width: 768px) { .ebk2-container{max-width: 720px} }
    @media (min-width: 992px) { .ebk2-container{max-width: 960px} }
    @media (min-width: 1280px) { .ebk2-container{max-width: 1180px} }
    @media (min-width: 1480px) { .ebk2-container{max-width: 1296px} }
    @media (min-width: 1580px) { .ebk2-container{max-width: 1320px} }
    @media (max-width:991px){ .ebk2-item{width:calc(50% - 8px)} }
    @media (min-width:992px) and (max-width:1279px){ .ebk2-item{width:calc(33.333% - 11px)}}
    @media (min-width:1280px) and (max-width:1479px){ .ebk2-item{width:calc(25% - 12px)}}
    @media (min-width:1480px){ .ebk2-item{width:calc(20% - 13px)} }
    `;
        const st = document.createElement("style");
        st.id = "ebk2-styles"; st.textContent = css; document.head.appendChild(st);
    }

    const fmt = n => Number(n).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " TL";
    const pct = (o, p) => (o > 0 && p > 0 && p < o) ? Math.round((1 - p / o) * 100) : null;
    const parseNum = t => Number(String(t).replace(/[^\d,.-]/g, '').replace('.', '').replace(',', '.'));
    const loadFavs = () => { try { return new Set(JSON.parse(localStorage.getItem(LS_FAV) || "[]")) } catch { return new Set() } };
    const saveFavs = set => localStorage.setItem(LS_FAV, JSON.stringify([...set]));
    const loadCache = () => {
        try {
            const ts = +localStorage.getItem(LS_TS) || 0;
            if (Date.now() - ts > TTL_MS) return null;
            const raw = localStorage.getItem(LS_PRODUCTS); return raw ? JSON.parse(raw) : null;
        } catch { return null }
    };
    const saveCache = arr => { localStorage.setItem(LS_PRODUCTS, JSON.stringify(arr)); localStorage.setItem(LS_TS, String(Date.now())); };
    const normalize = (raw) => {
        const arr = Array.isArray(raw) ? raw : (raw?.products || []);
        return arr.map((p, i) => {
            const image =
                (p.img && String(p.img).trim()) ||
                (p.image && String(p.image).trim()) ||
                (p.image_url && String(p.image_url).trim()) ||
                (p.imageUrl && String(p.imageUrl).trim()) ||
                "";

            return {
                id: String(p.id ?? `pid_${i}`),
                brand: p.brand ?? "",
                name: (p.name ?? "Ürün").trim(),
                url: (p.url ?? "#").trim(),
                image,
                price: Number(p.price ?? 0),
                original_price: Number(p.original_price ?? p.price ?? 0),
            };
        });
    };



    const fetchProducts = async () => {
        const cached = loadCache();
        if (cached) return cached;

        const res = await fetch(DATA_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(res.status);

        const data = await res.json();

        const list = normalize(data);

        saveCache(list);
        return list;
    };

    const updateHeartIcon = (heartDiv, isFav) => {

        const iconWrapper = heartDiv.querySelector('.icon-wrapper');

        if (iconWrapper) {
            if (isFav) {
                iconWrapper.innerHTML = `<i class="toys-icon toys-icon-heart-orange-filled" style="display: block"></i>`;
            } else {
                iconWrapper.innerHTML = `<i class="toys-icon toys-icon-heart-outline" style="display: block"></i>`;
            }
        }
    };


    const buildItem = (p, favsSet = new Set()) => {
        const isFav = favsSet.has(String(p.id));
        const hasDisc = p.original_price && p.price && p.price < p.original_price;
        const pct = hasDisc ? Math.round((1 - p.price / p.original_price) * 100) : null;

        const item = document.createElement('div');
        item.className = 'ebk2-item';

        item.innerHTML = `
    <eb-product-list-item>
      <div class="product-item">
        <eb-generic-link tabindex="-1" class="product-item-anchor">
          <a class="product-item-anchor ng-star-inserted" href="${p.url || '#'}" target="_blank" rel="noopener">
            <div class="poduct-item-info-group ng-star-inserted">
              <figure class="product-item__img list-view">
                <img
                    class="ebk2-img-fix"
                    alt="${(p.name || 'Ürün').replace(/"/g, '&quot;')}"
                    src="${p.image || ''}"
                    height="100%"
                    width="100%"
                    loading="lazy" decoding="async"
                    onError="console.error('Image failed to load:', ${p.image || ''})"
                    />
              </figure>

              <div class="product-item-content">
                <h2 class="product-item__brand">
                  ${p.brand ? `<b>${p.brand} - </b>` : ``}
                  <span class="description plist-desc">${p.name || 'Ürün'}</span>
                </h2>

                <div class="d-flex stars-wrapper align-items-center" >
                  <cx-star-rating disabled="true" style="--star-fill: 5; display: flex; align-items: center; gap: 4px;">
                    <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                    <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                    <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                    <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                    <cx-icon class="star cx-icon fas fa-star ng-star-inserted"></cx-icon>
                    <p class="review-count ng-star-inserted" style="margin: 0; white-space: nowrap;">(${p.review_count || 99})</p>
                  </cx-star-rating>
                </div>

                <div class="promotions"></div>
              </div>
            </div>

            <div class="product-item__price list-view ng-star-inserted">
              <eb-price-show class="ng-star-inserted">
                <div class="price-box price-box--list">
                  <div class="price-group-container">
                    <div class="price-group-1">
                      ${hasDisc ? `
                        <div class="original-price">
                          <span class="old-price-crossed">
                            ${Math.floor(Number(p.original_price)).toLocaleString('tr-TR')}<span class="ng-star-inserted">,${String(Number(p.original_price).toFixed(2)).split('.')[1]} TL</span>
                          </span>
                          <span class="discount">%${pct}</span>
                        </div>
                        <div class="discounted-price">
                          <strong class="new-price">
                            ${Math.floor(Number(p.price)).toLocaleString('tr-TR')}<span class="ng-star-inserted">,${String(Number(p.price).toFixed(2)).split('.')[1]} TL</span>
                          </strong>
                        </div>
                      ` : `
                        <div class="original-price">
                          <span class="old-price">
                            ${Math.floor(Number(p.price || p.original_price)).toLocaleString('tr-TR')}<span class="ng-star-inserted">,${String(Number(p.price || p.original_price).toFixed(2)).split('.')[1]} TL</span>
                          </span>
                        </div>
                      `}
                    </div>
                  </div>
                </div>
              </eb-price-show>
            </div>
          </a>
        </eb-generic-link>

        <eb-add-to-wish-list>
          <button type="button" class="heart"
           data-id="${p.id}"
           aria-pressed="${isFav ? 'true' : 'false'}"
           aria-label="Favorilere ekle/çıkar">
              <div class="icon-wrapper">
                ${isFav
                ? `<i class="toys-icon toys-icon-heart-orange-filled" style="display: block"></i>`
                : `<i class="toys-icon toys-icon-heart-outline" style="display: block"></i>`
            }
              </div>
              </button>
        </eb-add-to-wish-list>

        <div class="ins-add-to-cart-wrapper" ins-product-id="${p.id}">
          <eb-add-to-cart buttonvariant="circle">
            <div class="ng-untouched ng-pristine ng-valid ng-star-inserted" novalidate>
              <button id="addToCartBtn" class="btn btn-add disable btn-add-circle ng-star-inserted">
                <div class="inner-btn ng-star-inserted">
                  <i class="toys-icon toys-icon-plus-blue add-icon"></i>
                  <i class="toys-icon toys-icon-plus-white add-icon hovered"></i>
                </div>
              </button>
            </div>
          </eb-add-to-cart>
        </div>
      </div>
    </eb-product-list-item>
  `;
        return item;
    };



    const buildCarousel = (products) => {

        const wrap = document.createElement("section");
        wrap.className = "ebk2-wrap";
        wrap.innerHTML = `
      <div class="ebk2-container">
        <div class="ebk2-header">
          <h2>Beğenebileceğinizi düşündüklerimiz</h2>
        </div>
        <div class="ebk2-outer">
          <button class="swiper-prev" aria-label="back">
            <i class="toys-icon toys-icon-arrow-left"></i>
          </button>
          <button class="swiper-next" aria-label="next">
            <i class="toys-icon toys-icon-arrow-right"></i>
          </button>
          <div class="ebk2-row">
            <div class="ebk2-track"></div>
          </div>
        </div>
      </div>
    `;

        INSERT_HOST.insertBefore(wrap, EXISTING || INSERT_HOST.firstChild);

        const track = wrap.querySelector(".ebk2-track");
        const prev = wrap.querySelector(".swiper-prev");
        const next = wrap.querySelector(".swiper-next");

        const favs = loadFavs();

        products.forEach((p, index) => {
            const itemElement = buildItem(p, favs);
            track.appendChild(itemElement);
        });

        let favLock = false;
        track.addEventListener("click", (e) => {
            const btn = e.target.closest(".heart");
            if (!btn) return;


            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation?.();
            if (favLock) return;
            favLock = true;
            const id = String(btn.dataset.id);
            const set = loadFavs();
            const isActive = set.has(id);
            isActive ? set.delete(id) : set.add(id);
            saveFavs(set);
            updateHeartIcon(btn, !isActive);
            btn.setAttribute('aria-pressed', (!isActive).toString());

            setTimeout(() => { favLock = false; }, 200);
        });

        const GAP = 16;
        const items = Array.from(track.children);
        const outer = wrap.querySelector(".ebk2-row");
        let index = 0, tx = 0;

        const getW = () => items[0]?.getBoundingClientRect().width || 275.5;
        const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
        const maxIndex = () => {
            const w = getW();
            const visible = Math.max(1, Math.floor((outer.getBoundingClientRect().width + GAP) / (w + GAP)));
            return Math.max(0, items.length - visible);
        };
        const apply = () => {
            const w = getW();
            tx = -index * (w + GAP);
            track.style.transform = `translate3d(${tx}px,0,0)`;
            prev.toggleAttribute("disabled", index <= 0);
            next.toggleAttribute("disabled", index >= maxIndex());
        };
        prev.addEventListener("click", () => { index = clamp(index - 1, 0, maxIndex()); apply(); });
        next.addEventListener("click", () => { index = clamp(index + 1, 0, maxIndex()); apply(); });

        let isDown = false, startX = 0, startTX = 0, lastDX = 0;

        let dragging = false;
        const DRAG_THRESHOLD = 6;
        outer.addEventListener("pointerdown", (e) => {
            if (e.target.closest('.heart')) return;
            isDown = true;
            dragging = false;
            startX = e.clientX; startTX = tx; lastDX = 0;
            track.style.transition = "none";
        });
        outer.addEventListener("pointermove", (e) => {
            if (e.target.closest('.heart')) return;
            if (!isDown) return;
            const dx = e.clientX - startX; lastDX = dx;
            if (!dragging && Math.abs(dx) > DRAG_THRESHOLD) {
                dragging = true;
                outer.setPointerCapture?.(e.pointerId);
            }
            if (dragging) {
                track.style.transform = `translate3d(${startTX + dx}px,0,0)`;
            }
        });

        const end = (e) => {
            if (e.target.closest('.heart')) return;
            if (!isDown) return; isDown = false;
            track.style.transition = "";
            if (!dragging) {
                return;
            }
            const w = getW();
            const moved = Math.round((-(startTX + lastDX)) / (w + GAP));
            index = clamp(moved, 0, maxIndex()); apply();
            outer.releasePointerCapture?.(e.pointerId);
        };
        outer.addEventListener("pointerup", end);
        outer.addEventListener("pointercancel", end);
        window.addEventListener("resize", apply);
        apply();
    };

    (async () => {
        try {
            const cached = loadCache();
            const products = cached || await fetchProducts();
            if (!cached) saveCache(products);
            buildCarousel(products);
        } catch (e) {
            console.error("ebk2 error:", e);
        }
    })();
})();
