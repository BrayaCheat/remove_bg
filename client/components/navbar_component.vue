<template>
    <nav class="flex items-center justify-between p-3 border-b shadow-sm">
        <div class="flex items-center gap-3">
            <Icon name="f7:square-stack-3d-down-right" class="drop-shadow-xl w-6 h-6" />
            <span class="text-lg">Remove Background</span>
        </div>
        <div>
            <Dialog>
                <DialogTrigger as-child>
                    <Button class="flex items-center gap-3 bg-zinc-100 text-zinc-800 hover:text-zinc-100">
                        <Icon name="line-md:coffee-twotone-loop" class="w-6 h-6" />
                        <span class="text-lg">$1</span>
                    </Button>
                </DialogTrigger>
                <DialogContent class="md:w-[360px] w-full">
                    <img src="/images/IMG_5800.PNG" alt="MY ABA :(" class="object-cover md:h-[500px] h-full w-full rounded-md drop-shadow-sm">
                </DialogContent>
            </Dialog>
        </div>
    </nav>
</template>

<script setup>
import {
    Dialog,
    DialogTrigger,
    DialogContent
} from '../components/ui/dialog'
</script>
