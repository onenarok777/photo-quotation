import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const swal = MySwal.mixin({
  background: '#181820',
  color: '#ffffff',
  customClass: {
    popup: 'border border-white/10 rounded-2xl shadow-2xl',
    confirmButton: 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity mx-2',
    cancelButton: 'bg-white/5 text-gray-300 px-6 py-2.5 rounded-xl font-medium hover:bg-white/10 transition-colors mx-2',
    title: 'text-xl font-bold tracking-tight',
    htmlContainer: 'text-gray-400'
  },
  buttonsStyling: false,
  reverseButtons: true
});
