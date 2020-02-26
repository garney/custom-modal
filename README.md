custom-modal

A simple reat custom modal

## 🚀 Getting Started

Using [`npm`]():

```bash
npm i custom-modal
```

## ✨ Usage

```javascript
import { Modal, showModal }  from 'custom-modal';
 
function DeepChild() {
  return (
    <div>
      <button onClick={() => {
            showModal({
                title: 'Modal test',
                message: 'This is a message'   
            })  
        }}>Show</button>
      
    </div>
  )
}
 
export default () => {
  return (
    <div className="main-app">
        <DeepChild/>
        <Modal/>
    </div>
  );
};
```

## 📌 Props

Prop                  | Type     | Default                   | Required
--------------------- | -------- | ------------------------- | --------
`options`|any|`false`|No

## ✌️ License
[MIT](https://opensource.org/licenses/MIT)
