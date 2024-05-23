// script.js

document.addEventListener('DOMContentLoaded', () => {
    const layoutBuilder = document.getElementById('layout-builder');
  
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  
    function createPartition() {
      const partition = document.createElement('div');
      partition.classList.add('partition');
      partition.style.backgroundColor = getRandomColor();
      partition.innerHTML = `
        <div class="buttons">
          <button class="split-button vertical">V</button>
          <button class="split-button horizontal">H</button>
          <button class="remove-button">-</button>
        </div>
      `;
      return partition;
    }
  
    function splitPartition(partition, direction) {
      const parent = partition.parentNode;
      const newPartition = createPartition();
  
      const partitionClone = partition.cloneNode(true);
      partitionClone.style.backgroundColor = partition.style.backgroundColor;
  
      if (direction === 'vertical') {
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'row';
        wrapper.style.flex = 1;
        partitionClone.style.flex = 1;
        newPartition.style.flex = 1;
        wrapper.appendChild(partitionClone);
        wrapper.appendChild(newPartition);
        parent.replaceChild(wrapper, partition);
      } else {
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.flex = 1;
        partitionClone.style.flex = 1;
        newPartition.style.flex = 1;
        wrapper.appendChild(partitionClone);
        wrapper.appendChild(newPartition);
        parent.replaceChild(wrapper, partition);
      }
  
      addEventListeners(partitionClone);
      addEventListeners(newPartition);
    }
  
    function addEventListeners(partition) {
      partition.querySelector('.vertical').addEventListener('click', () => splitPartition(partition, 'vertical'));
      partition.querySelector('.horizontal').addEventListener('click', () => splitPartition(partition, 'horizontal'));
      partition.querySelector('.remove-button').addEventListener('click', () => removePartition(partition));
    }
  
    function removePartition(partition) {
      const parent = partition.parentNode;
      if (parent.parentNode.id === 'layout-builder' && parent.childElementCount === 1) {
        alert('Cannot remove the last partition.');
        return;
      }
      parent.removeChild(partition);
    }
  
    const initialPartition = document.getElementById('initial-partition');
    initialPartition.style.backgroundColor = getRandomColor();
    initialPartition.innerHTML = `
      <div class="buttons">
        <button class="split-button vertical">V</button>
        <button class="split-button horizontal">H</button>
        <button class="remove-button">-</button>
      </div>
    `;
  
    addEventListeners(initialPartition);
    initialPartition.classList.add('partition-resizable');
  });
  