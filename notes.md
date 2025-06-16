# 🧩 Motion Patterns

### 1. AnimatePresence (Entry/Exit Animations)
Wrap motion components to enable exit animations:
```tsx
<AnimatePresence initial={false}>
  {isOpen && (
    <motion.div
      key="modal"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    />
  )}
</AnimatePresence>
```

Children require unique key props for correct behavior

### 2. usePresence / useIsPresent (Manual Exit Control)
Control unmount timing manually:

```tsx
function ConfirmDialog() {
  const [isPresent, safeToRemove] = usePresence();
  useEffect(() => {
    if (!isPresent) {
      setTimeout(() => safeToRemove(), 300);
    }
  }, [isPresent]);
  return (
    <motion.div exit={{ opacity: 0, scale: 0.9 }}>Are you sure?</motion.div>
  );
}
```
Useful for sequencing, cleanup, or delayed removal 


### 3. useMotionValue & Composables
Track performant animating values manually:

```jsx
const x = useMotionValue(0);
const opacity = useTransform(x, [0, 100], [1, 0]);

useMotionValueEvent(x, "change", (latest) => {
  console.log("x changed:", latest);
});

return <motion.div drag="x" style={{ x, opacity }} />;
```
useMotionValue holds state/velocity, avoids re-renders 


useTransform maps motion values (e.g. fade out) 
motion.dev

### 4. useMotionTemplate (Combine Values into Strings)
Interpolate motion values into CSS strings:

```jsx

const x = useMotionValue(0);
const shadow = useSpring(x, { stiffness: 200 });
const filter = useMotionTemplate`
  drop-shadow(${shadow}px ${shadow}px 10px rgba(0,0,0,0.3));

return <motion.div style={{ filter }} drag="x" />;
```
Auto-updates with underlying values 


### 5. useAnimate + usePresence (Scoped imperative animations)
Fine‑grained timeline control:

```jsx
function List({ items }) {
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (isPresent) {
      animate(scope.current, { opacity: 1 }, { duration: 0.3 });
    } else {
      animate(scope.current, { opacity: 0 }, { duration: 0.2 }).then(
        () => safeToRemove()
      );
    }
  }, [isPresent]);

  return (
    <ul ref={scope}>
      {items.map(i => (
        <li key={i.id}>{i.text}</li>
      ))}
    </ul>
  );
}
```
scope limits selector to local subtree 
usePresence flags exiting state; call safeToRemove() after custom exit 


## 🧠 When to Use What
- AnimatePresence:	Standard entry/exits via props (exit={{}})
- usePresence:	Custom exit logic, delays, cleanup
- useMotionValue:	Manual value control, cross-component syncing
- useTransform:	Map/scale one motion value to another
- useMotionValueEvent:	Hooks for value events (change, complete)
- useMotionTemplate:	Compose string-based styles (like filters/Shadows)
- useAnimate:	Imperative sequence, scoped timeline animations

✅ Summary
🚪 Enter/Exit with AnimatePresence and exit props.

🕓 Manual flow control via usePresence + timeouts or animate().

🎛 Fine control via useMotionValue, useTransform, useMotionValueEvent.

🧩 String interpolation (e.g. CSS filters) with useMotionTemplate.

🧪 Scoped animations (e.g. list fade-ins) using useAnimate.
