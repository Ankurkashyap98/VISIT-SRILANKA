# Sri Lanka Tourism - Accessibility Guide

## 🎯 **Accessibility-First Design Philosophy**

Our Sri Lanka Tourism platform is designed with accessibility as a core principle, ensuring that people of all ages and abilities can easily navigate and use our services. We follow WCAG 2.1 AA guidelines and implement best practices for inclusive design.

## ♿ **Accessibility Features Implemented**

### **1. Visual Accessibility**

#### **Enhanced Color Contrast**
- **Primary Colors**: WCAG AA compliant contrast ratios (4.5:1 minimum)
- **Text Colors**: High contrast text (#1a1a1a on white backgrounds)
- **Interactive Elements**: Clear visual distinction between states
- **High Contrast Mode**: Automatic detection and support for `prefers-contrast: high`

#### **Typography & Readability**
- **Font Sizes**: Minimum 16px base font size for optimal readability
- **Line Heights**: Relaxed line spacing (1.75) for better text flow
- **Font Weights**: Clear hierarchy with appropriate font weights
- **Large Text Support**: Toggle for larger text sizes (18px+)

#### **Visual Indicators**
- **Focus States**: Clear 3px outline with high contrast colors
- **Active States**: Distinct visual feedback for current page/state
- **Hover States**: Subtle but clear hover effects
- **Loading States**: Clear loading indicators and disabled states

### **2. Motor & Physical Accessibility**

#### **Touch-Friendly Design**
- **Minimum Touch Targets**: 44px minimum for all interactive elements
- **Spacing**: Adequate spacing between clickable elements
- **Button Sizes**: Large enough for easy interaction
- **Mobile Navigation**: Optimized for touch interaction

#### **Keyboard Navigation**
- **Tab Order**: Logical tab sequence throughout the site
- **Skip Links**: "Skip to main content" for efficient navigation
- **Keyboard Shortcuts**: Standard keyboard interactions
- **Focus Management**: Proper focus handling in dynamic content

### **3. Cognitive Accessibility**

#### **Clear Information Architecture**
- **Logical Structure**: Intuitive navigation and content organization
- **Consistent Design**: Predictable patterns and interactions
- **Clear Labels**: Descriptive labels for all form elements
- **Error Handling**: Clear error messages and validation feedback

#### **Reduced Cognitive Load**
- **Simple Language**: Clear, concise text throughout
- **Visual Hierarchy**: Clear heading structure and content organization
- **Progress Indicators**: Clear progress through multi-step processes
- **Help Text**: Contextual help and guidance

### **4. Screen Reader & Assistive Technology Support**

#### **Semantic HTML**
- **Proper Heading Structure**: H1-H6 hierarchy for content organization
- **Landmark Roles**: Navigation, main, banner, contentinfo roles
- **List Structure**: Proper ul/ol for navigation and content lists
- **Form Labels**: Associated labels for all form inputs

#### **ARIA Support**
- **ARIA Labels**: Descriptive labels for interactive elements
- **ARIA States**: Current, expanded, selected states
- **ARIA Live Regions**: Dynamic content announcements
- **Role Attributes**: Proper roles for custom components

#### **Screen Reader Optimizations**
- **Alt Text**: Descriptive alt text for all images
- **Hidden Content**: Screen reader only content where needed
- **Live Regions**: Announcements for dynamic content changes
- **Skip Links**: Efficient navigation for screen reader users

### **5. Responsive & Adaptive Design**

#### **Device Compatibility**
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Responsive design for tablet users
- **Desktop Enhancement**: Enhanced features for desktop users
- **Touch & Mouse**: Support for both input methods

#### **Adaptive Features**
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Dark Mode**: Support for `prefers-color-scheme: dark`
- **High Contrast**: Automatic high contrast mode detection
- **Print Styles**: Optimized print stylesheets

## 🛠️ **Technical Implementation**

### **CSS Accessibility Features**

```css
/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --primary: #000080;
    --text-dark: #000000;
    --focus-ring: #0000ff;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus indicators */
:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 2px;
}

/* Touch-friendly sizing */
.touch-friendly {
  min-height: 44px;
  min-width: 44px;
}
```

### **HTML Accessibility Features**

```html
<!-- Skip links -->
<a href="#main-content" class="skip-link sr-only-focusable">
  Skip to main content
</a>

<!-- Semantic navigation -->
<nav role="navigation" aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a href="/destinations" role="menuitem" aria-current="page">
        Destinations
      </a>
    </li>
  </ul>
</nav>

<!-- Form accessibility -->
<label for="email-input">Email Address</label>
<input 
  id="email-input" 
  type="email" 
  aria-describedby="email-help"
  required 
/>
<div id="email-help">We'll never share your email</div>
```

### **JavaScript Accessibility Features**

```javascript
// Screen reader announcements
const announceToScreenReader = (message) => {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'polite')
  announcement.className = 'sr-only'
  announcement.textContent = message
  document.body.appendChild(announcement)
  setTimeout(() => document.body.removeChild(announcement), 1000)
}

// Keyboard navigation
const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    closeModal()
  }
  if (event.key === 'Enter' || event.key === ' ') {
    activateButton()
  }
}
```

## 🧪 **Testing & Validation**

### **Automated Testing**
- **Lighthouse**: Regular accessibility audits
- **axe-core**: Automated accessibility testing
- **WAVE**: Web accessibility evaluation
- **Color Contrast**: Automated contrast ratio checking

### **Manual Testing**
- **Keyboard Navigation**: Full keyboard testing
- **Screen Reader Testing**: NVDA, JAWS, VoiceOver testing
- **Mobile Testing**: Touch and gesture testing
- **User Testing**: Testing with actual users with disabilities

### **Browser Support**
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Assistive Technology**: Screen readers, voice control
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Legacy Support**: Graceful degradation for older browsers

## 📱 **Mobile Accessibility**

### **Touch Optimization**
- **Large Touch Targets**: 44px minimum for all interactive elements
- **Gesture Support**: Swipe, pinch, zoom support
- **Orientation Support**: Portrait and landscape modes
- **Zoom Support**: Up to 200% zoom without horizontal scrolling

### **Mobile-Specific Features**
- **Voice Control**: VoiceOver and TalkBack support
- **Switch Control**: External switch support
- **Magnification**: Built-in magnification support
- **High Contrast**: Mobile high contrast mode support

## 🎨 **Design System Accessibility**

### **Color Palette**
- **Primary**: #006D77 (WCAG AA compliant)
- **Text**: #1a1a1a (High contrast)
- **Background**: #ffffff (Clean, accessible)
- **Accent**: #FFB703 (High contrast for focus states)

### **Typography Scale**
- **Base**: 16px (Minimum readable size)
- **Large**: 18px (Enhanced readability)
- **Headings**: 20px-36px (Clear hierarchy)
- **Line Height**: 1.5-1.75 (Optimal reading flow)

### **Spacing System**
- **Touch Targets**: 44px minimum
- **Element Spacing**: 16px-32px consistent spacing
- **Content Spacing**: 24px-48px for readability
- **Focus Outlines**: 3px with 2px offset

## 🚀 **Future Enhancements**

### **Planned Features**
- **Voice Navigation**: Voice command support
- **AI-Powered Assistance**: Smart accessibility features
- **Personalization**: User-customizable accessibility settings
- **Advanced Screen Reader**: Enhanced screen reader support

### **Continuous Improvement**
- **User Feedback**: Regular accessibility feedback collection
- **Testing Updates**: Ongoing accessibility testing
- **Standards Compliance**: WCAG 2.2 preparation
- **Technology Updates**: Latest accessibility technology integration

## 📞 **Support & Resources**

### **Accessibility Support**
- **Help Center**: Comprehensive accessibility help
- **User Guides**: Step-by-step accessibility guides
- **Video Tutorials**: Visual accessibility tutorials
- **Community Forum**: User-to-user accessibility support

### **Contact Information**
- **Accessibility Team**: accessibility@visitsrilanka.gov.lk
- **Emergency Support**: +94 11 2 426 426
- **Feedback Form**: Online accessibility feedback
- **User Testing**: Regular accessibility user testing sessions

## ✅ **Compliance & Standards**

### **Standards Compliance**
- **WCAG 2.1 AA**: Full compliance with Web Content Accessibility Guidelines
- **Section 508**: US federal accessibility standards
- **ADA Compliance**: Americans with Disabilities Act compliance
- **EN 301 549**: European accessibility standard

### **Certification**
- **Accessibility Audit**: Regular third-party accessibility audits
- **User Testing**: Ongoing testing with users with disabilities
- **Compliance Monitoring**: Continuous compliance monitoring
- **Certification Renewal**: Annual accessibility certification renewal

This comprehensive accessibility implementation ensures that our Sri Lanka Tourism platform is truly inclusive and accessible to all users, regardless of their abilities or the devices they use.
