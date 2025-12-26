/**
 * TMC Website - Interactive Demo
 */

// Demo tab switching
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.demo-tab');
    const panels = document.querySelectorAll('.demo-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding panel
            const demo = this.dataset.demo;
            const panel = document.getElementById(`demo-${demo}`);
            if (panel) {
                panel.classList.add('active');
            }
        });
    });
});
