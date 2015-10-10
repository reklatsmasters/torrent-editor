import filesize from 'file-size';

export default function size(length) {
  var s = filesize(length).calculate('iec');
    
  var value = s.fixed.endsWith('.00') ? s.result : s.fixed;
  var unit = s.suffix == 'Bytes' ? 'B' : s.suffix;
  
  return value + '&nbsp;' + unit;
}