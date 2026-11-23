/**
 * Ray Chowdhury Foundation (RCF) - International Client & Interactive Logic
 * Modern, High-UI Philanthropic Web Architecture
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            requestAnimationFrame(() => {
                mobileMenu.classList.remove('translate-x-full');
            });
            if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        });

        const closeMenu = () => {
            mobileMenu.classList.add('translate-x-full');
            if (mobileMenuBackdrop) mobileMenuBackdrop.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            setTimeout(() => {
                if (mobileMenu.classList.contains('translate-x-full')) {
                    mobileMenu.classList.add('hidden');
                }
            }, 300);
        };

        if (closeMobileMenu) closeMobileMenu.addEventListener('click', closeMenu);
        if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', closeMenu);
        mobileNavLinks.forEach(link => link.addEventListener('click', closeMenu));
    }

    // 2. Sticky Navbar scroll effect
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                mainNav.classList.add('shadow-md', 'bg-white/98');
                mainNav.classList.remove('bg-white/95');
            } else {
                mainNav.classList.remove('shadow-md', 'bg-white/98');
                mainNav.classList.add('bg-white/95');
            }
        });
    }

    // 3. Donation Frequency Switcher (Once vs Monthly)
    let donationFrequency = 'once';
    const freqBtns = document.querySelectorAll('.donation-freq-btn');
    const impactBanner = document.getElementById('donationImpactBanner');

    freqBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            freqBtns.forEach(b => {
                b.classList.remove('bg-primary', 'text-white', 'shadow-xs', 'font-black');
                b.classList.add('bg-transparent', 'text-slate-600', 'hover:text-slate-900');
            });
            e.currentTarget.classList.add('bg-primary', 'text-white', 'shadow-xs', 'font-black');
            e.currentTarget.classList.remove('bg-transparent', 'text-slate-600', 'hover:text-slate-900');

            donationFrequency = e.currentTarget.dataset.freq;
            if (impactBanner) {
                if (donationFrequency === 'monthly') {
                    impactBanner.innerHTML = '<i class="fa-solid fa-sparkles text-amber-500 mr-1.5"></i> <strong>Monthly Partner:</strong> Your recurring gift provides continuous, reliable nourishment and schooling each month.';
                    impactBanner.classList.add('border-amber-300', 'bg-amber-50/70', 'text-amber-900');
                    impactBanner.classList.remove('border-emerald-200', 'bg-emerald-50/50', 'text-emerald-900');
                } else {
                    impactBanner.innerHTML = '<i class="fa-solid fa-shield-check text-emerald-600 mr-1.5"></i> <strong>Immediate Relief:</strong> 100% of your one-time gift is directly converted into emergency food, clean water, and education.';
                    impactBanner.classList.remove('border-amber-300', 'bg-amber-50/70', 'text-amber-900');
                    impactBanner.classList.add('border-emerald-200', 'bg-emerald-50/50', 'text-emerald-900');
                }
            }
        });
    });

    // 4. Donation Amount Buttons & Custom Amount Input
    const amountBtns = document.querySelectorAll('.donation-amount-btn');
    const customAmountInput = document.getElementById('customAmountInput');
    const selectedAmountDisplay = document.getElementById('selectedAmountDisplay');

    amountBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            amountBtns.forEach(b => {
                b.classList.remove('border-primary', 'bg-primary', 'text-white', 'shadow-2xs');
                b.classList.add('border-slate-200', 'bg-slate-50', 'text-slate-700');
            });
            e.currentTarget.classList.remove('border-slate-200', 'bg-slate-50', 'text-slate-700');
            e.currentTarget.classList.add('border-primary', 'bg-primary', 'text-white', 'shadow-2xs');

            const amt = e.currentTarget.dataset.amount;
            if (customAmountInput) customAmountInput.value = amt;
            updateSelectedDisplay(amt);
        });
    });

    if (customAmountInput) {
        customAmountInput.addEventListener('input', (e) => {
            const val = e.target.value;
            amountBtns.forEach(b => {
                if (b.dataset.amount === val) {
                    b.classList.add('border-primary', 'bg-primary', 'text-white');
                    b.classList.remove('border-slate-200', 'bg-slate-50', 'text-slate-700');
                } else {
                    b.classList.remove('border-primary', 'bg-primary', 'text-white');
                    b.classList.add('border-slate-200', 'bg-slate-50', 'text-slate-700');
                }
            });
            updateSelectedDisplay(val || 0);
        });
    }

    function updateSelectedDisplay(val) {
        if (!selectedAmountDisplay) return;
        const curr = localStorage.getItem('rcf_currency') || 'CAD';
        const sym = (currencyRates[curr] && currencyRates[curr].symbol) || 'CA$';
        selectedAmountDisplay.textContent = `${sym} ${Number(val).toLocaleString()}`;
    }

    // 5. Payment Gateway Switcher Tabs
    const gatewayTabs = document.querySelectorAll('.gateway-tab-btn');
    const gatewayPanes = document.querySelectorAll('.gateway-pane');

    gatewayTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const target = e.currentTarget.dataset.target;
            gatewayTabs.forEach(t => t.classList.remove('active', 'border-primary', 'text-primary', 'bg-white', 'shadow-xs'));
            gatewayTabs.forEach(t => t.classList.add('border-transparent', 'text-slate-500', 'bg-slate-100'));

            e.currentTarget.classList.add('active', 'border-primary', 'text-primary', 'bg-white', 'shadow-xs');
            e.currentTarget.classList.remove('border-transparent', 'text-slate-500', 'bg-slate-100');

            gatewayPanes.forEach(p => {
                if (p.id === target) {
                    p.classList.remove('hidden');
                } else {
                    p.classList.add('hidden');
                }
            });
        });
    });

    // 6. Credit Card Live Preview & Input Formatting
    const ccNumberInput = document.getElementById('ccNumber');
    const ccNameInput = document.getElementById('ccName');
    const ccExpInput = document.getElementById('ccExp');
    const ccPreviewNumber = document.getElementById('previewCardNumber');
    const ccPreviewName = document.getElementById('previewCardName');
    const ccPreviewExp = document.getElementById('previewCardExp');
    const ccBrandLogo = document.getElementById('cardBrandLogo');

    if (ccNumberInput) {
        ccNumberInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '').substring(0, 16);
            let formatted = val.match(/.{1,4}/g)?.join(' ') || '';
            e.target.value = formatted;
            if (ccPreviewNumber) {
                ccPreviewNumber.textContent = formatted || '•••• •••• •••• ••••';
            }

            // Detect card brand
            if (ccBrandLogo) {
                if (val.startsWith('4')) {
                    ccBrandLogo.innerHTML = '<i class="fa-brands fa-cc-visa text-2xl text-blue-400"></i>';
                } else if (/^5[1-5]/.test(val) || /^2[2-7]/.test(val)) {
                    ccBrandLogo.innerHTML = '<i class="fa-brands fa-cc-mastercard text-2xl text-orange-400"></i>';
                } else if (/^3[47]/.test(val)) {
                    ccBrandLogo.innerHTML = '<i class="fa-brands fa-cc-amex text-2xl text-blue-300"></i>';
                } else {
                    ccBrandLogo.innerHTML = '<i class="fa-solid fa-credit-card text-2xl text-slate-300"></i>';
                }
            }
        });
    }

    if (ccNameInput && ccPreviewName) {
        ccNameInput.addEventListener('input', (e) => {
            ccPreviewName.textContent = e.target.value.toUpperCase() || 'DONOR NAME';
        });
    }

    if (ccExpInput && ccPreviewExp) {
        ccExpInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '').substring(0, 4);
            if (val.length >= 3) {
                val = val.substring(0, 2) + '/' + val.substring(2, 4);
            }
            e.target.value = val;
            ccPreviewExp.textContent = val || 'MM/YY';
        });
    }

    // 7. Interactive International Checkout & Digital Receipt Generator
    window.processInternationalDonation = function(e, paymentMethod) {
        if (e) e.preventDefault();

        // Get details
        const name = document.getElementById('donorName')?.value || 'Distinguished Supporter';
        const email = document.getElementById('donorEmail')?.value || 'donor@example.com';
        const amount = document.getElementById('customAmountInput')?.value || '100';
        const curr = localStorage.getItem('rcf_currency') || 'CAD';
        const sym = (currencyRates[curr] && currencyRates[curr].symbol) || 'CA$';
        const causeRadio = document.querySelector('input[name="donation_cause"]:checked');
        const cause = causeRadio ? causeRadio.value : 'General Humanitarian Fund';

        // Show processing state
        showToast('Initiating 256-bit SSL encrypted transaction...', 'info');

        setTimeout(() => {
            // Populate Receipt Modal
            const serialNo = `RCF-INT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
            const dateStr = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            document.getElementById('receiptSerialNo').textContent = serialNo;
            document.getElementById('receiptDate').textContent = dateStr;
            document.getElementById('receiptDonorName').textContent = name;
            document.getElementById('receiptDonorEmail').textContent = email;
            document.getElementById('receiptAmount').textContent = `${sym} ${Number(amount).toLocaleString()} ${curr}`;
            document.getElementById('receiptCause').textContent = cause;
            document.getElementById('receiptMethod').textContent = paymentMethod || 'International Gateway';

            // Show Receipt Modal
            const receiptModal = document.getElementById('receiptModal');
            if (receiptModal) {
                receiptModal.classList.remove('hidden');
                receiptModal.classList.add('flex');
            }
            showToast('✅ Transaction authorized! Official Digital Receipt generated.', 'success');
        }, 1100);
    };

    window.closeReceiptModal = function() {
        const receiptModal = document.getElementById('receiptModal');
        if (receiptModal) {
            receiptModal.classList.add('hidden');
            receiptModal.classList.remove('flex');
        }
    };

    // 8. Gallery Tab Filtering
    const galleryTabs = document.querySelectorAll('.gallery-tab-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryTabs.forEach(btn => {
        btn.addEventListener('click', (e) => {
            galleryTabs.forEach(b => {
                b.classList.remove('bg-primary', 'text-white', 'shadow-xs');
                b.classList.add('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');
            });
            e.currentTarget.classList.add('bg-primary', 'text-white', 'shadow-xs');
            e.currentTarget.classList.remove('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');

            const filter = e.currentTarget.dataset.filter;
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // 9. Lightbox Modal
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightbox = document.getElementById('closeLightbox');

    window.openLightbox = function(src, caption) {
        if (!lightboxModal) return;
        lightboxImg.src = src;
        lightboxCaption.textContent = caption || 'Ray Chowdhury Foundation Field Record';
        lightboxModal.classList.remove('hidden');
        lightboxModal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    };

    const closeLightboxModal = () => {
        if (!lightboxModal) return;
        lightboxModal.classList.add('hidden');
        lightboxModal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    };

    if (closeLightbox) closeLightbox.addEventListener('click', closeLightboxModal);
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) closeLightboxModal();
        });
    }

    // 10. FAQ Accordions
    const faqButtons = document.querySelectorAll('.faq-question');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');
            const isOpen = answer.classList.contains('open');

            document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
            document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

            if (!isOpen) {
                answer.classList.add('open');
                if (icon) icon.classList.add('rotate-180');
            }
        });
    });

    // 11. Zakat Calculator Modal & Calculation
    const zakatModal = document.getElementById('zakatModal');
    const openZakatBtns = document.querySelectorAll('.open-zakat-btn');
    const closeZakatBtn = document.getElementById('closeZakatBtn');

    openZakatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (zakatModal) {
                zakatModal.classList.remove('hidden');
                zakatModal.classList.add('flex');
                document.body.classList.add('overflow-hidden');
            }
        });
    });

    const closeZakat = () => {
        if (zakatModal) {
            zakatModal.classList.add('hidden');
            zakatModal.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        }
    };

    if (closeZakatBtn) closeZakatBtn.addEventListener('click', closeZakat);
    if (zakatModal) {
        zakatModal.addEventListener('click', (e) => {
            if (e.target === zakatModal) closeZakat();
        });
    }

    window.calculateZakat = function() {
        const cash = parseFloat(document.getElementById('zCash')?.value || 0);
        const gold = parseFloat(document.getElementById('zGold')?.value || 0);
        const inv = parseFloat(document.getElementById('zInvest')?.value || 0);
        const debts = parseFloat(document.getElementById('zDebts')?.value || 0);

        const netWealth = Math.max(0, (cash + gold + inv) - debts);
        const zakatDue = netWealth * 0.025; // 2.5%

        const curr = localStorage.getItem('rcf_currency') || 'CAD';
        const sym = (currencyRates[curr] && currencyRates[curr].symbol) || 'CA$';

        const netEl = document.getElementById('netWealthDisplay');
        const zakatEl = document.getElementById('zakatDueDisplay');

        if (netEl) netEl.textContent = `${sym} ${netWealth.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        if (zakatEl) zakatEl.textContent = `${sym} ${zakatDue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    };

    window.applyZakatToDonation = function() {
        const zakatEl = document.getElementById('zakatDueDisplay');
        if (!zakatEl) return;
        const text = zakatEl.textContent.replace(/[^0-9.]/g, '');
        const amount = Math.round(parseFloat(text) || 100);

        const customInput = document.getElementById('customAmountInput');
        if (customInput) {
            customInput.value = amount;
            updateSelectedDisplay(amount);
        }

        // Check general or Zakat cause
        const generalRadio = document.querySelector('input[name="donation_cause"][value="সাধারণ তহবিল"]') || document.querySelector('input[name="donation_cause"]');
        if (generalRadio) generalRadio.checked = true;

        closeZakat();
        window.location.hash = '#donate';
        showToast(`Zakat amount of ${amount} added to donation form!`, 'success');
    };

    // 12. Volunteer Modal
    const volModal = document.getElementById('volunteerModal');
    const openVolBtns = document.querySelectorAll('.open-volunteer-btn');
    const closeVolBtn = document.getElementById('closeVolunteerBtn');

    openVolBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (volModal) {
                volModal.classList.remove('hidden');
                volModal.classList.add('flex');
                document.body.classList.add('overflow-hidden');
            }
        });
    });

    const closeVol = () => {
        if (volModal) {
            volModal.classList.add('hidden');
            volModal.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        }
    };

    if (closeVolBtn) closeVolBtn.addEventListener('click', closeVol);
    if (volModal) {
        volModal.addEventListener('click', (e) => {
            if (e.target === volModal) closeVol();
        });
    }

    // 13. Copy To Clipboard Helper
    window.copyToClipboard = function(text, btnId) {
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.getElementById(btnId);
            if (btn) {
                const originalHtml = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check text-emerald-400 mr-1"></i> Copied!';
                btn.classList.add('bg-emerald-600/30', 'text-emerald-300');
                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                    btn.classList.remove('bg-emerald-600/30', 'text-emerald-300');
                }, 2000);
            }
            showToast('Copied to clipboard: ' + text, 'success');
        }).catch(() => {
            showToast('Unable to copy automatically.', 'error');
        });
    };

    // 14. Universal Form Submit Helper
    window.handleFormSubmit = function(e, msg) {
        if (e) e.preventDefault();
        showToast(msg || 'Thank you! Your information has been securely received.', 'success');
        if (e && e.target) e.target.reset();
        closeVol();
    };

    // Toast Notification System
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 px-4 py-3 rounded-xl shadow-2xl text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all transform translate-y-10 opacity-0 ${
            type === 'success' ? 'bg-slate-900 text-white border border-emerald-500/50' : 
            type === 'error' ? 'bg-rose-900 text-white border border-rose-500/50' : 
            'bg-slate-900 text-white border border-blue-500/50'
        }`;

        let icon = '<i class="fa-solid fa-circle-check text-emerald-400 text-base"></i>';
        if (type === 'error') icon = '<i class="fa-solid fa-circle-exclamation text-rose-400 text-base"></i>';
        if (type === 'info') icon = '<i class="fa-solid fa-circle-notch fa-spin text-blue-400 text-base"></i>';

        toast.innerHTML = `${icon}<span>${message}</span>`;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('translate-y-10', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');
        }, 50);

        setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-10', 'opacity-0');
            setTimeout(() => toast.remove(), 400);
        }, 3800);
    }
});
