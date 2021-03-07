export function getAdaptiveTextColor(hex)
{
  if(!hex)
    return 'var(--color-foreground)';

  let [red, green, blue] = hex.replace('#', '').match(/.{1,2}/g);
  const perceivedLightness = (
    (parseInt(red, 16) * 0.299)
    + (parseInt(green, 16) * 0.587)
    + (parseInt(blue, 16) * 0.114)
  ) / 255;
  return `hsl(0, 0%, calc((${perceivedLightness} - 0.65) * -10000000%))`;
}
