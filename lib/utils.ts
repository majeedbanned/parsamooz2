import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useRouter, useSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { Router } from "next/router";
import CryptoJS from 'crypto-js';
import queryString from 'query-string';
// export const encodeObjectToHashedQueryString=(obj:any)=> {
//   const queryString = Object.keys(obj)
//     .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
//     .join('&');
  
//   const hashedQueryString = CryptoJS.AES.encrypt(queryString, 'your-secret-key').toString();
//   return hashedQueryString;
// }
export function removeMathJaxHTMLContentold(htmlString: string) {
  // Create a new DOM parser
  var parser = new DOMParser();

  // Parse the input HTML string to a DOM document
  var doc = parser.parseFromString(htmlString, 'text/html');

  // Get all elements with class 'MathJax'
  var mathJaxElements = doc.querySelectorAll('.MathJax');

  mathJaxElements.forEach(function(element) {
    // Wrap the MathJax element in a div with a specific class
    var wrapper = document.createElement('div');
    wrapper.className = 'ltr-mathjax';
    element.parentNode?.insertBefore(wrapper, element);
    wrapper.appendChild(element);

    // Remove unwanted spans and scripts
    var spans = element.querySelectorAll('span');
    spans.forEach(function(span) {
      if (span.classList.contains('MathJax_Preview') || span.classList.contains('MJX_Assistive_MathML')) {
        span.remove();
      }
    });

    var scripts = element.querySelectorAll('script');
    scripts.forEach(function(script) {
      script.remove();
    });
  });

  // Serialize the cleaned DOM document back to an HTML string
  return doc.body.innerHTML;
}


export function removeMathJaxHTMLContent(htmlString:string) {
  // Create a new DOM parser
  var parser = new DOMParser();
  
  // Parse the input HTML string to a DOM document
  var doc = parser.parseFromString(htmlString, 'text/html');
  
  // Get all elements with class 'MathJax'
  var mathJaxElements = doc.querySelectorAll('.MathJax');

  mathJaxElements.forEach(function(element) {
      // Find all 'span' elements within each MathJax element
      var spans = element.querySelectorAll('span');

      spans.forEach(function(span) {
          // If the span element has either 'MathJax_Preview' or 'MJX_Assistive_MathML', remove it
          if (span.classList.contains('MathJax_Preview') || span.classList.contains('MJX_Assistive_MathML')) {
              span.remove();
          }
      });

      // Find all 'script' elements within each MathJax element and remove them
      var scripts = element.querySelectorAll('script');
      scripts.forEach(function(script) {
          script.remove();
      });
  });

  var img = doc.querySelector('img');
  if (img) {
    var srcParts = img.src.split('/');
    var lastTwoSections = srcParts.slice(-2).join('/');
    img.src = 'http://192.168.6.80/q/' + lastTwoSections;
  }

  // Serialize the cleaned DOM document back to an HTML string
  return doc.body.innerHTML;
}




export function encodeObjectToHashedQueryString(obj:any) {
  const qs = queryString.stringify(obj);
  const hashedQueryString = CryptoJS.AES.encrypt(qs, 'your-secret-key').toString();
  console.log("original", hashedQueryString);

  return encodeURIComponent(hashedQueryString);
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


interface SWRError extends Error {
  status: number;
}

declare global {
  interface String {
    toPersianDigits(): string
   
  }
  interface String {
    toEnglishDigits():string
   
  }
}
//@ts-ignore
String.prototype.toEnglishDigits = function () {
  const persianDigits = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  let convertedString = this;
  for (let i = 0; i < persianDigits.length; i++) {
    convertedString = convertedString.replace(persianDigits[i], englishDigits[i]);
  }

  return convertedString;
};

String.prototype.toPersianDigits = function () {
  var id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return this.replace(/[0-9]/g, function (w) {
    return id[+w];
  });
};


export   const formatNumber = (value: string) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  const characterToReplace = ",";
  const replacementCharacter = "";

  const nval = value.replace(
    new RegExp(characterToReplace, "g"),
    replacementCharacter
  );

  const amount = BigInt(nval.toEnglishDigits());

  // console.log("naval", nval.toEnglishDigits());
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IRR",
  }).format(amount);
  let ret = formatted.replace("IRR", "").trim();
  const y = ret.toPersianDigits();
  // console.log("yyy", ret);
  return ret;
};
export const setQueryString = (
  router: Router,
  param: string,
  value: string,
) => {
  if (param !== "page") delete router.query.page;
  let newQuery;
  if (value.length > 0) {
    newQuery = {
      ...router.query,
      [param]: value,
    };
  } else {
    delete router.query[param];
    newQuery = { ...router.query };
  }
  // here, we omit the slug from the query string as well
  const { slug, ...finalQuery } = newQuery;
  router.replace({
    pathname: `/${router.query.slug || "links"}`,
    query: finalQuery,
  });
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const error = await res.text();
    const err = new Error(error) as SWRError;
    err.status = res.status;
    throw err;
  }
//console.log(res.json())
  return res.json();
}


const logTypeToEnv = {
  cron: process.env.SLACK_HOOK_CRON,
  links: process.env.SLACK_HOOK_LINKS,
};
export const log = async ({
  message,
  type,
  mention = false,
}: {
  message: string;
  type: "cron" | "links";
  mention?: boolean;
}) => {
  /* Log a message to the console */
  
  const HOOK = logTypeToEnv[type];
  //console.log(HOOK)

  if (!HOOK) return;
  try {

    return await fetch(HOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `${mention ? "<@U0404G6J3NJ> " : ""}${message}`,
            },
          },
        ],
      }),
    });
  } catch (e) {

    console.log(`Failed to log to Dub Slack. Error: ${e}`);
  }
};

