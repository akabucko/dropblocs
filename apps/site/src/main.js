import Alpine from 'alpinejs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { registerMotion } from '@dropblocs/tokens/motion';

gsap.registerPlugin(ScrollTrigger);
registerMotion(gsap, CustomEase);

// Blocks reference these globals; never import GSAP or Alpine inside a block (ADR 0005).
window.Alpine = Alpine;
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

Alpine.start();
