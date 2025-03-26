"use client";
import * as React from "react";
import { FormatFullTimeStamp } from "../date-format";
import { Badge } from "../ui/badge";
// import type {
//   ArticleLayoutProps,
//   DocumentLayoutProps,
// } from "@/utils/interfaces";
// import { useLanguageStore } from "@/store/useLanguageStore";
import { Author } from "../author";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SimpleLayout = ({ doc, children }: any) => {
  const { title, tags, date, cover = "", stylesheet } = doc;
  const article = React.useRef("main_article");
  // const { language } = useLanguageStore() as LanguageStore;

  return (
    <section id={article.current} className={cn("main-article")}>
      <div className="max-w-full h-auto mb-5">
        <div
          className={cn(
            "lg:max-w-[712px] md:max-w-full block mx-auto md:px-0 px-4"
          )}
        >
          <h5 className={cn("font-semibold tracking-wide")}>
            <FormatFullTimeStamp date={date} locale={"pt-br"} />
          </h5>
          <h1
            className={cn(
              "md:text-[40px] text-3xl font-bold tracking-tight mb-4"
            )}
          >
            {title}
          </h1>
        </div>
        {/* {cover && (
          <div className="lg:max-w-[1080px] md:max-w-full mx-auto mb-5">
            <picture>
              <source media="(max-width: 768px)" srcSet={cover} />
              <source media="(min-width: 769px)" srcSet={cover} />
              <img
                src={cover}
                className={cn("w-full max-w-full h-[600px] object-cover")}
                alt={`${title} Image`}
              />
            </picture>
          </div>
        )} */}
      </div>
      <article
        className={cn(
          "article-grid text-dark dark:text-light prose max-w-none dark:prose-invert"
        )}
      >
        {children}
        {doc.gallery && doc.gallery.length > 0 && (
          <>
            <h3 className="text-2xl font-bold"> Galeria: </h3>
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                {doc.gallery.map((image: any, index: any) => (
                  <CarouselItem className="lg:basis-1/2 basis-full shadow-2xl">
                    <img
                      src={image}
                      className="w-full h-full object-cover "
                      alt={title}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </>
        )}
        {Array.isArray(tags) && tags.length > 0 && (
          <div className="my-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="default"
                className="capitalize text-xs rounded"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </article>
      <div className="article-grid">
        <Author />
      </div>
    </section>
  );
};

export default SimpleLayout;
