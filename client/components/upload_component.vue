<template>
    <div class="relative md:w-[600px] w-full">

        <Icon name="meteocons:pollen-grass-fill" class="absolute left-8 top-4 w-16 h-16 -rotate-12" />
        <Icon name="meteocons:pollen-grass-fill" class="absolute right-8 top-4 w-16 h-16 rotate-12" />
        <Icon name="meteocons:pollen-flower-fill" class="absolute w-36 h-36 top-20 right-10 animate-float" />

        <div class="drop-zone border-dashed rounded-md border-2 p-12 hover:bg-zinc-100 duration-300" @dragover.prevent @dragenter.prevent
            @drop.prevent="handleDropEvent" ref="dropZoneRef">


            <h1 class="text-3xl text-center font-bold text-zinc-600">
                {{ msg }}
            </h1>

            <div class="flex flex-col items-center gap-6 pt-10 pb-10">
                <Button :disabled="isLoading ? true : false" class="shadow-sm flex items-center gap-1 w-fit bg-pink-400"
                    @click="handleClickEvent">
                    <span class="uppercase font-bold text-lg px-6">Upload Image</span>
                </Button>
                <Input id="picture" type="file" @change="handleAddEvent" class="hidden" />
                <p>or drop a file</p>
            </div>



            <Card v-if="isLoading" class="flex items-end justify-center gap-1 text-lg p-3">
                <p class="text-xl animate-pulse">Generating</p>
                <Icon name="svg-spinners:3-dots-fade" />
            </Card>


            <Card v-if="response" class="relative">
                <img :src="downloadUrl" alt="" class="h-[300px] w-full object-contain">
                <div class="absolute top-1 left-1">
                    <Button class="bg-zinc-100 text-zinc-800 hover:text-zinc-100" @click="handleClearEvent">
                        <Icon name="mdi:close" class="w-6 h-6"/>
                    </Button>
                </div>
                <div class="absolute top-1 right-1 flex items-center gap-3">
                    <a :href="downloadUrl">
                        <Button class="bg-pink-400 text-lg uppercase">
                            <Icon name="ic:outline-remove-red-eye" class="w-6 h-6" />
                        </Button>
                    </a>
                    <a :href="downloadUrl" download="image_png">
                        <Button class="bg-pink-400 text-lg uppercase">
                            <Icon name="material-symbols:cloud-download-outline-rounded" class="w-6 h-6" />
                        </Button>
                    </a>
                </div>
            </Card>
        </div>

    </div>
</template>

<script setup>
import { toast } from './ui/toast';
import { useDropZone } from '@vueuse/core'

const msg = ref('Upload an image to remove the background')
const image = ref(null)
const response = ref(null)
const isLoading = ref(false)
const downloadUrl = ref('')
const dropZoneRef = ref(null)
const componentKey = ref(0)
const { files } = useDropZone(dropZoneRef)


const handleClearEvent = () => {
    window.location.reload()
}

const handleClickEvent = () => {
    const file = document.getElementById('picture')
    file.click()
}

const handleDropEvent = (event) => {
    image.value = event.dataTransfer.files[0]
    handleFileUpload()
}

const handleAddEvent = (event) => {
    const file = event.target.files[0]
    if (!file) {
        toast({ description: "File is missing" })
        return
    }
    image.value = file
    handleFileUpload()
}

const handleFileUpload = async () => {
    if (image.value) {
        isLoading.value = true
        const fd = new FormData()
        fd.append('image', image.value)
        try {
            const res = await $fetch('/api/remove', { method: "POST", body: fd, responseType: 'blob' })

            if (res) {
                response.value = res
                const url = URL.createObjectURL(res)
                downloadUrl.value = url
            }
            isLoading.value = false
        } catch (error) {
            isLoading.value = false
            toast({
                description: error
            })
        }
    } else {
        isLoading.value = false
        toast({ description: "File is empty" })
    }
}
</script>