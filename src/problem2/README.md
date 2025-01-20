### Code Review

#### 🟢 Good Practices
- Clean component structure using React hooks
- Proper loading state management
- Responsive UI with Tailwind CSS
- Basic form validation
- API error handling

#### 🔴 Issues to Address
1. **Form Validation**
- Current validation uses alerts
- No input sanitization

2. **Error Handling**
- Reliance on window.alert()
- No user-friendly error display

3. **Code Organization**
- Duplicated select component code
- Mixed concerns in handleSwap

4. **Accessibility**
- Missing aria labels
- No form submission handling

These changes:
- Extract CurrencySelect into reusable component
- Add proper form submission
- Improve error handling with UI feedback
- Enhance accessibility
- Add proper type checking with props
